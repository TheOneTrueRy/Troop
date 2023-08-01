import { observer } from 'mobx-react-lite';
import React from 'react';
import PropTypes from "prop-types";
import { Event } from "../models/Event.js";
import { BindEditable } from "../utils/FormHandler.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventsService } from "../services/EventsService.js";

function EditEvent({ event }) {
  let editable = new Event({ event })
  let bindEditable = BindEditable(editable)

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

    <div className="container-fluid">
      <div className="row">
        <form onSubmit={editEvent}>
          <div className="col-12">
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" name="name" placeholder="Event Name..." defaultValue={event.name} onChange={bindEditable} maxLength={100} className="form-control" />
          </div>
          <div className="col-12">
            <label htmlFor="description">Event Description</label>
            <textarea name="description" id="description" cols={30} rows={6} className="form-control w-100" defaultValue={event.description} onChange={bindEditable} maxLength={2000} placeholder="Event Description..."></textarea>
          </div>
          <div className="col-6">

          </div>
          <div className="col-6">

          </div>
        </form>
      </div>
    </div>
  )

}

EditEvent.propTypes = {
  event: PropTypes.object.isRequired
}

export default observer(EditEvent)