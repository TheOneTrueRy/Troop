import { observer } from 'mobx-react-lite';
import React from 'react';
import { Event } from "../models/Event.js";
import { BindEditable } from "../utils/FormHandler.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventsService } from "../services/EventsService.js";
import { AppState } from "../AppState.js";

function EditEvent() {
  const event = AppState.event;
  let editable = new Event({ event });
  let bindEditable = BindEditable(editable);

  async function editEvent() {
    try {
      window.event.preventDefault()
      logger.log(editable)
      await eventsService.editEvent(editable);
    }
    catch (error) {
      Pop.error(error);
    }
  }


  return (
    // FIXME Just this whole weird editable and bindEditable situation, man.
    <div className="container-fluid px-3">
      <form onSubmit={editEvent}>
        <div className="row">
          <div className="col-12">
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" name="name" placeholder="Event Name..." defaultValue={event?.name} onChange={bindEditable} maxLength={100} className="form-control" required />
          </div>
          <div className="col-12 pt-2">
            <label htmlFor="description">Event Description</label>
            <textarea name="description" id="description" cols={30} rows={6} className="form-control w-100" defaultValue={event?.description} onChange={bindEditable} maxLength={2000} placeholder="Event Description..."></textarea>
          </div>
          <div className="col-6 pt-2">
            <label htmlFor="location">Event Location</label>
            <input type="text" id="location" name="location" placeholder="Event Location..." className="form-control" defaultValue={event?.location} onChange={bindEditable} maxLength={50} required />
          </div>
          <div className="col-6 pt-2">
            <label htmlFor="startDate">Event Start Date</label>
            <input type="date" name="startDate" id="startDate" className="form-control" defaultValue={new Date(event?.startDate).toLocaleDateString('fr-CA')} onChange={bindEditable} min={new Date().toLocaleDateString('fr-CA')} required />
          </div>
          <div className="col-12 text-end pt-3">
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

export default observer(EditEvent)