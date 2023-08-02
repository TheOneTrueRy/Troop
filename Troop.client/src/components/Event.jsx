import { observer } from 'mobx-react-lite';
import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Event({ event }) {

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 px-3 py-2">
      <Link to={`events/${event.id}`} title={`Visit the details page of "${event.name}"!`}>
        <div className="event-card selectable" style={{ backgroundImage: `url(${event.coverImg})` }}>
          <div className="w-100 d-flex flex-column bg-blur bottom-event-card-rounded">
            <span className="fs-5 text-light text-shadow ps-1">
              {event.name}
            </span>
            <span className="text-light text-shadow ps-1">
              {event.location}
            </span>
            <span className="text-light text-shadow ps-1">
              {event.startDate}
            </span>
            {event.capacity != 0 && event.isCanceled == false && <span className="text-light text-shadow text-end pe-1">
              {event.capacity} spots left
            </span>}
            {event.capacity == 0 && event.isCanceled == false && <span className="text-center w-100 fw-bold canceled">
              At Capacity
            </span>}
            {event.isCanceled == true && <span className="text-center w-100 fw-bold canceled">
              Canceled
            </span>}
          </div>
        </div>
      </Link>
    </div>
  )

}

Event.propTypes = {
  event: PropTypes.object.isRequired
}
export default observer(Event)