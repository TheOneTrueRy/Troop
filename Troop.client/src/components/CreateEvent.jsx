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

    <div className="CreateEvent">

    </div>
  )

}
export default observer(CreateEvent)