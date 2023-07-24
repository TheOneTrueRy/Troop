import { observer } from 'mobx-react-lite';
import React from 'react';
import PropTypes from "prop-types";

function Event({ event }) {

  return (

    <div className="col-6 col-md-4 col-lg-3 p-3">
      <span className="fs-3 capitalize-first">
        {event.type} event
      </span>
    </div>
  )

}

Event.propTypes = {
  event: PropTypes.object.isRequired
}
export default observer(Event)