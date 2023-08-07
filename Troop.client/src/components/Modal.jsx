import { observer } from 'mobx-react-lite';
import React from 'react';
import PropTypes from "prop-types";


function Modal({ id, children }) {

  return (
    <div className="modal fade" id={`${id}`} tabIndex={-2} aria-labelledby="modalLabel" aria-hidden="true" style={{ zIndex: 9999 }}>
      <div className="modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
        <div className="modal-content bg-dark p-2 pb-3">
          {children}
        </div>
      </div>
    </div>
  )

}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default observer(Modal)