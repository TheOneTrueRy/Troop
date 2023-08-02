import { observer } from 'mobx-react-lite';
import React from 'react';
import { Event } from "../models/Event.js";
import { BindEditable } from "../utils/FormHandler.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";

function CreateEvent() {
  let editable = new Event({});
  let bindEditable = BindEditable(editable);

  async function createEvent() {
    try {
      window.event.preventDefault()
      await eventsService.createEvent(editable);
    }
    catch (error) {
      Pop.error(error);
    }
  }

  return (
    // FIXME This modal has backdrop overlay on top of it, can't interact with anything on page anymore after opening, must refresh 😑
    <div className="container-fluid px-3">
      <form onSubmit={createEvent}>
        <div className="row">
          <div className="col-12 pt-2">
            <label htmlFor="name">Event Name</label>
            <input type="text" name="name" id="name" placeholder="Event Name..." className="form-control" defaultValue={editable.name} onChange={bindEditable} maxLength={50} required />
          </div>
          <div className="col-12 pt-2">
            <label htmlFor="coverImg">Event Cover Img URL</label>
            <input type="url" name="coverImg" id="coverImg" placeholder="Event Cover Img URL..." className="form-control" defaultValue={editable.coverImg} onChange={bindEditable} required />
          </div>
          <div className="col-12 pt-2">
            <label htmlFor="description">Event Description</label>
            <textarea placeholder="Event Description..." name="description" id="description" rows={7} className="form-control w-100" defaultValue={editable.description} onChange={bindEditable} maxLength={2000}></textarea>
          </div>
          <div className="col-6 pt-2">
            <label htmlFor="location">Event Location</label>
            <input type="text" name="location" id="location" placeholder="Event Location..." className="form-control" defaultValue={editable.location} onChange={bindEditable} maxLength={25} required />
          </div>
          <div className="col-6 pt-2">
            <label htmlFor="startDate">Event Start Date</label>
            <input type="date" name="startDate" id="startDate" className="form-control" defaultValue={editable.startDate} onChange={bindEditable} min={new Date().toLocaleDateString('fr-CA')} required />
          </div>
          <div className="col-6 pt-2">
            <label htmlFor="capacity">Event Capacity</label>
            <input type="number" name="capacity" id="capacity" className="form-control" defaultValue={editable.capacity} onChange={bindEditable} min={1} required />
          </div>
          <div className="col-6 pt-4 d-flex align-items-center justify-content-end">
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