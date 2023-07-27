import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";

function EventDetailsPage() {
  const { eventId } = useParams()
  const event = AppState.event;

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

    <div className="EventDetailsPage">
      <span className="fs-1">
        This is the {event?.name} event!
      </span>
    </div>
  )

}
export default observer(EventDetailsPage)