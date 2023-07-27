import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";

function EventDetailsPage() {
  const { eventId } = useParams();
  const event = AppState.event;
  const account = AppState.account;

  useEffect(() => {
    document.title = 'Troop - Event 🎉',
      getEvent(eventId)
  }, [])

  async function getEvent(eventId) {
    try {
      await eventsService.getEvent(eventId);
    }
    catch (error) {
      Pop.error(error);
    }
  }


  return (
    <div className="container-fluid">
      <div className="row event-details-card elevation-2" style={{ backgroundImage: `url(${event.coverImg})` }}>
        <div className="container">
          <div className="row icy py-4 px-3">

            {account?.id != null && event.creator.id == account?.id && <div className="col-12 d-flex align-items-center justify-content-end">
              <span className="text-center">
                ...
              </span>
            </div>}
            <div className="col-4 d-none d-lg-block event-details-pic " style={{ backgroundImage: `url(${event.coverImg})` }}>

            </div>
            <div className="col-12 col-lg-8 py-1 ps-0 ps-lg-2 pe-0">
              <div className="container-fluid h-100 d-flex flex-column justify-content-between">
                <div className="row">
                  <div className="col-6">
                    <span className="fs-4 text-shadow">
                      {event.name}
                    </span>
                  </div>
                  <div className="col-6 text-end">
                    <span className="fs-5 text-shadow">
                      {event.startDate}
                    </span>
                  </div>
                  <div className="col-6">
                    <span className="fs-5 text-shadow">
                      {event.location}
                    </span>
                  </div>
                  <div className="col-12 pt-3">
                    <span className="fs-5 text-shadow">
                      {event.description}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <span className="fs-4 text-shadow">
                      <span className={event.capacity > 0 ? "text-info" : "text-danger"}>{event.capacity}</span> spots left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
export default observer(EventDetailsPage)