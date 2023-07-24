import { observer } from 'mobx-react-lite';
import React from 'react';
import PropTypes from "prop-types";

function Event({ event }) {

  return (

    <div className="col-6 col-lg-4 col-xl-3 p-4">
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