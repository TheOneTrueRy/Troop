import { observer } from 'mobx-react-lite';
import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Event({ event }) {

  return (

    <div className="col-12 col-md-6 col-lg-4 col-xl-3 px-3 py-3">
      <Link to={`events/${event.id}`} title={`Visit the details page of "${event.name}"!`}>
        <div className="event-card selectable" style={{ backgroundImage: `url(${event.coverImg})` }}>
          <div className="w-100 px-1 d-flex flex-column bg-blur">
            <span className="fs-5 text-light text-shadow">
              {event.name}
            </span>
            <span className="text-light text-shadow">
              {event.location}
            </span>
            <span className="text-light text-shadow">
              {event.startDate}
            </span>
            <span className="text-light text-shadow text-end">
              {event.capacity} spots left
            </span>
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