import { observer } from 'mobx-react-lite';
import React from 'react';
import { Event } from "../models/Event.js";
import { BindEditable } from "../utils/FormHandler.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  let editable = new Event({});
  let bindEditable = BindEditable(editable);
  const navigate = useNavigate();

  async function createEvent() {
    try {
      window.event.preventDefault()
      let eventId = await eventsService.createEvent(editable);
      editable = new Event({});
      // @ts-ignore
      document.getElementById('createFormEvent').reset();
      Pop.success('Event successfully created!');
      navigate(`/events/${eventId}`);
    }
    catch (error) {
      Pop.error(error);
    }
  }

  return (
    <div className="container-fluid px-3">
      <form onSubmit={createEvent} id="createFormEvent">
        <div className="row">
          <div className="col-12 pt-2">
            <label htmlFor="name">Event Name</label>
            <input type="text" name="name" id="name" placeholder="Event Name..." className="form-control bg-dark text-light" defaultValue={editable.name} onChange={bindEditable} maxLength={50} required />
          </div>
          <div className="col-12 pt-2">
            <label htmlFor="coverImg">Event Cover Img URL</label>
            <input type="url" name="coverImg" id="coverImg" placeholder="Event Cover Img URL..." className="form-control bg-dark text-light" defaultValue={editable.coverImg} onChange={bindEditable} required maxLength={500} />
          </div>
          <div className="col-12 pt-2">
            <label htmlFor="description">Event Description</label>
            <textarea placeholder="Event Description..." name="description" id="description" rows={7} className="form-control bg-dark text-light w-100" defaultValue={editable.description} onChange={bindEditable} maxLength={2000}></textarea>
          </div>
          <div className="col-6 pt-2">
            <label htmlFor="location">Event Location</label>
            <input type="text" name="location" id="location" placeholder="Event Location..." className="form-control bg-dark text-light" defaultValue={editable.location} onChange={bindEditable} maxLength={50} required />
          </div>
          <div className="col-6 pt-2">
            <label htmlFor="startDate">Event Start Date</label>
            <input type="date" name="startDate" id="startDate" className="form-control bg-dark text-light" defaultValue={editable.startDate} onChange={bindEditable} min={new Date().toLocaleDateString('fr-CA')} required />
          </div>
          <div className="col-6 pt-2">
            <label htmlFor="capacity">Event Capacity</label>
            <input type="number" name="capacity" id="capacity" className="form-control bg-dark text-light" defaultValue={editable.capacity} onChange={bindEditable} min={1} required />
          </div>
          <div className="col-6 pt-2">
            <label htmlFor="type">Event Type</label>
            <select name="type" id="type" className="form-control bg-dark text-light" defaultValue={editable.type} onChange={bindEditable} required placeholder="Event Type...">
              <option value="" selected disabled hidden style={{ display: "none" }}></option>
              <option value="convention">Convention</option>
              <option value="sport">Sports</option>
              <option value="digital">Digital</option>
              <option value="concert">Concert</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-12 pt-4 d-flex align-items-center justify-content-end">
            <button className="my-prp-btn px-3 py-1 elevation-1 bg-danger me-4" type="button" data-bs-dismiss="modal" aria-label="Close">
              Cancel
            </button>
            <button type="submit" className="my-prp-btn px-3 py-1 elevation-1 text-light" data-bs-dismiss="modal" aria-label="Close">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  )

}
export default observer(CreateEvent)