import { observer } from 'mobx-react-lite';
import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Event({ event }) {

  return (

    <div className="col-12 col-md-6 col-lg-4 col-xl-3 px-3 py-3">
      <Link to={`events/${event.id}`} title={`Visit the details page of "${event.name}"!`}>
        <div className="event-card selectable">
          <span className="text-dark">
            Hi
          </span>
        </div>
      </Link>
    </div>
  )

}

Event.propTypes = {
  event: PropTypes.object.isRequired
}
export default observer(Event)