import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { AppState } from "../AppState.js";
import { accountService } from "../services/AccountService.js";
import TicketCard from "../components/TicketCard.jsx";

function AccountPage() {

  const tickets = AppState.myTickets;

  useEffect(() => {
    document.title = 'Troop - Account 👤';
    accountService.getMyTickets();
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <span className="fs-5 px-0 mt-3">
          Upcoming Events
        </span>
        {tickets.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.id} />
        ))}
      </div>
    </div>
  )
}

export default observer(AccountPage)