import { observer } from 'mobx-react-lite';
import React from 'react';
import PropTypes from "prop-types";
import Pop from "../utils/Pop.js";
import { attendeesService } from "../services/AttendeesService.js";
import { Link } from "react-router-dom";

function TicketCard({ ticket }) {

  async function deleteTicket() {
    try {
      if (await Pop.confirm('Are you sure wish to delete this ticket?')) {
        await attendeesService.unattendEvent(ticket.id);
      }
    }
    catch (error) {
      Pop.error(error);
    }
  }

  return (
    <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 mt-5 ticket-card g-0" key={ticket?.id}>
      <div className="container-fluid h-100">
        <div className="row h-100">
          <Link to={`https://ry-troop.onrender.com/events/${ticket.event.id}`} title={`Visit the details page of "${ticket.event.name}"!`} className="col-4 g-0 event-details-card h-100" style={{ backgroundImage: `url(${ticket?.event?.coverImg})` }}>
          </Link>
          <div className="col-8 bg-grey bg-gradient py-2 px-1">
            <div className="container-fluid h-100 d-flex flex-column justify-content-between">
              <div className="row">
                <div className="col-12 pb-2">
                  <Link to={`https://ry-troop.onrender.com/events/${ticket.event.id}`} title={`Visit the details page of "${ticket.event.name}"!`} className="text-light">
                    <span className="fw-bold">
                      {ticket.event.name}
                    </span>
                  </Link>
                </div>
                <div className="col-12">
                  <span>
                    {ticket.event.location}
                  </span>
                </div>
                <div className="col-12">
                  <span>
                    {ticket.event.startDate}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-end align-items-center">
                  <button className="my-prp-btn canceled elevation-1 px-3 py-1" onClick={deleteTicket}>
                    Delete Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

TicketCard.propTypes = {
  ticket: PropTypes.object.isRequired
}

export default observer(TicketCard)