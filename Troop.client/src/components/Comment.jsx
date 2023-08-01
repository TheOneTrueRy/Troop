import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import React from 'react';

function Comment({ comment }) {

  return (

    <>

    </>
  )

}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
}

export default observer(Comment)