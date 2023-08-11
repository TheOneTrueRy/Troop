import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { attendeesService } from "../services/AttendeesService.js";
import { FaEllipsisH } from "react-icons/fa";
import { logger } from "../utils/Logger.js";
import { commentsService } from "../services/CommentsService.js";
import { BindEditable } from "../utils/FormHandler.js";
import { Comment } from "../models/Comment.js";
import CommentCard from "../components/CommentCard.jsx";
import Modal from "../components/Modal.jsx";
import EditEvent from "../components/EditEvent.jsx";

function EventDetailsPage() {
  const { eventId } = useParams();
  const event = AppState.event;
  const account = AppState.account;
  const attendees = AppState.eventTickets;
  const comments = AppState.comments;
  let editable = new Comment({});
  let bindEditable = BindEditable(editable);

  useEffect(() => {
    document.title = 'Troop - Event 🎉';
    getEvent(eventId);
    getEventTickets(eventId);
    getEventComments(eventId);
    window.scrollTo(0, 0);
  }, [])

  async function getEvent(eventId) {
    try {
      await eventsService.getEvent(eventId);
    }
    catch (error) {
      Pop.error(error);
    }
  }

  async function getEventTickets(eventId) {
    try {
      await attendeesService.getEventTickets(eventId);
    }
    catch (error) {
      Pop.error(error);
    }
  }

  async function attendEvent() {
    try {
      await attendeesService.attendEvent(event?.id);
      event.capacity--;
    }
    catch (error) {
      Pop.error(error);
    }
  }

  async function unattendEvent() {
    try {
      let ticket = AppState.myTickets.find(t => t.eventId == event?.id)
      logger.log('Ticket:', ticket)
      if (await Pop.confirm('Are you sure you wish to not attend this event?')) {
        await attendeesService.unattendEvent(ticket?.id);
        event.capacity++;
      }
    }
    catch (error) {
      Pop.error(error);
    }
  }

  async function getEventComments(eventId) {
    try {
      await commentsService.getEventComments(eventId);
    }
    catch (error) {
      Pop.error(error);
    }
  }

  async function postComment() {
    try {
      window.event.preventDefault()
      editable.eventId = event?.id
      await commentsService.postComment(editable)
      editable = new Comment({})
      // @ts-ignore
      document.getElementById("commentForm").reset();
    }
    catch (error) {
      Pop.error(error);
    }
  }

  function setEdit() {
    AppState.editing = event
  }

  async function cancelEvent() {
    try {
      if (await Pop.confirm('Are you SURE you wish to cancel this event? This is IRREVERSIBLE.')) {
        await eventsService.cancelEvent(event?.id);
      }
    }
    catch (error) {
      Pop.error(error);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row event-details-card elevation-2" style={{ backgroundImage: `url(${event?.coverImg})` }}>
        <div className="container">
          <div className={account?.id == event?.creator.id ? "row icy px-3 pb-4 pt-1" : "row icy px-3 pb-4 pt-4"}>
            {account?.id != null && event?.creator.id == account?.id && event?.isCanceled === false && <div className="col-12 d-flex align-items-center justify-content-end">
              <div className="dropdown">
                <button className="btn fs-3 py-0 px-3 no-border icy" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaEllipsisH className="d-flex" />
                </button>
                <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark py-0" aria-labelledby="dropdownMenuButton1">
                  <li className="selectable py-1 ps-1 rounded-top text-center" data-bs-toggle="modal" data-bs-target="#editEventModal" onClick={setEdit}>
                    Edit Event
                  </li>
                  <li className="selectable py-1 ps-1 rounded-bottom text-center" onClick={cancelEvent}>
                    Cancel Event
                  </li>
                </ul>
              </div>
            </div>}
            <div className="col-4 d-none d-lg-flex event-details-pic elevation-1" style={{ backgroundImage: `url(${event?.coverImg})` }}>
            </div>
            <div className="col-12 col-lg-8 py-1 ps-0 ps-lg-2 pe-0 ">
              <div className="container-fluid h-100 d-flex flex-column justify-content-between">
                <div className="row">
                  <div className="col-8">
                    <span className="fs-4 text-shadow">
                      {event?.name}
                    </span>
                  </div>
                  <div className="col-4 text-end">
                    <span className="fs-5 text-shadow">
                      {event?.startDate}
                    </span>
                  </div>
                  <div className="col-12">
                    <span className="fs-5 text-shadow">
                      {event?.location}
                    </span>
                  </div>
                  <div className="col-12 py-3">
                    <span className="text-shadow text-lighter">
                      {event?.description}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 d-flex align-items-center">
                    <span className="fs-4 text-shadow">
                      <span className={event?.capacity > 0 ? "text-light" : "text-danger"}>{event?.capacity}</span> spots left
                    </span>
                  </div>
                  <div className="col-6 text-end">
                    {account != null && event?.capacity > 0 && event?.isCanceled != true && attendees.findIndex(t => t?.profile.id == account.id) == -1 && <button className="my-prp-btn fs-5 py-2 elevation-1 px-4 text-light" onClick={attendEvent}>
                      Attend Event
                    </button>}
                    {account == null && <button className="btn fs-5 elevation-1 py-2 px-4" disabled>
                      Log-In to Attend
                    </button>}
                    {account != null && event?.isCanceled == true && <button className="btn fs-5 elevation-1 py-2 px-4" disabled>
                      This Event Is Canceled
                    </button>}
                    {account != null && event?.capacity == 0 && event?.isCanceled == false && <button className="btn fs-5 elevation-1 py-2 px-4" disabled>
                      This Event Is At Capacity
                    </button>}
                    {account != null && attendees.findIndex(t => t?.profile.id == account.id) != -1 && <button className="my-prp-btn bg-danger fs-5 py-2 px-4 elevation-1" onClick={unattendEvent}>
                      Delete Ticket
                    </button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 g-0">
          <span className="">
            See who is attending
          </span>
        </div>
        <div className="col-12 bg-grey bg-gradient px-2 py-2 rounded mt-2 elevation-2">
          {attendees.length == 0 && event?.isCanceled === false && <span className="fs-5">
            No Attendees Yet!
          </span>}
          {event?.isCanceled == true && <span className="fs-5">
            This event has been canceled.
          </span>}
          {attendees.map((a) => (
            <img className="rounded-circle me-1" height={40} width={40} key={a?.id} src={a?.profile.picture} title={a?.profile.name} />
          ))}
        </div>
      </div>
      <div className="row mt-5 pt-5 mb-4">
        <div className="col-12 col-xl-10 offset-xl-1 g-0">
          <span>
            What are people saying
          </span>
          <div className="container-fluid mt-2">
            <div className="row bg-grey bg-gradient py-2 rounded px-4">
              {account != null && <form id="commentForm" onSubmit={postComment} className="g-0 pt-3">
                <div className="col-12 g-0">
                  <textarea name="body" id="body" cols={30} rows={5} placeholder="Tell the people..." className="w-100 rounded form-control" onChange={bindEditable} defaultValue={editable.body} maxLength={2000}></textarea>
                </div>
                <div className="col-12 d-flex justify-content-end align-items-center my-3 g-0">
                  <button type="submit" className="my-prp-btn px-4 py-2 elevation-1 text-light">
                    Post Comment
                  </button>
                </div>
              </form>}
              <div className="col-12 py-2 g-0">
                {comments.length > 0 && <div className="container-fluid py-2">
                  {comments.map((comment) => (
                    <CommentCard comment={comment} key={comment.id} />
                  ))}
                </div>}
                {comments.length == 0 && <div className="container-fluid">
                  <div className="row text-center py-5">
                    <span className="fs-1">
                      <i>No Comments Yet!</i>
                    </span>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal id='editEventModal'>
        <EditEvent />
      </Modal>
    </div>

  )

}
export default observer(EventDetailsPage)