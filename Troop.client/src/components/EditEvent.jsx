import { observer } from 'mobx-react-lite';
import React from 'react';
import PropTypes from "prop-types";

function EditEvent({ event }) {

  return (

    <div className="EditEvent">

    </div>
  )

}

EditEvent.propTypes = {
  event: PropTypes.object.isRequired
}

export default observer(EditEvent)