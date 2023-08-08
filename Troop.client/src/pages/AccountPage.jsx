import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { AppState } from "../AppState.js";
import { accountService } from "../services/AccountService.js";
import TicketCard from "../components/TicketCard.jsx";
import { BindEditable } from "../utils/FormHandler.js";
import Pop from "../utils/Pop.js";

function AccountPage() {
  const tickets = AppState.myTickets;
  let editable = { ...AppState.account };
  let bindEditable = BindEditable(editable);

  useEffect(() => {
    document.title = 'Troop - Account 👤';
    accountService.getMyTickets();
    window.scrollTo(0, 0);
  }, [])

  async function editAccount() {
    try {
      window.event.preventDefault()
      await accountService.editAccount(editable)
      Pop.success('Successfully edited account!')
    }
    catch (error) {
      Pop.error(error);
    }
  }

  return (
    <div className="container-fluid">
      <form onSubmit={editAccount}>
        <div className="row mb-2">
          <span className="text-center fs-4 px-0">
            Edit Your Account
          </span>
          <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 mt-4">
            <label htmlFor="name">Username</label>
            <input name="name" id="name" defaultValue={editable.name} onChange={bindEditable} type="text" required className="form-control bg-dark text-light" placeholder="Username..." maxLength={255} />
          </div>
          <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 mt-3">
            <label htmlFor="picture">Profile Picture</label>
            <input name="picture" id="picture" defaultValue={editable.picture} onChange={bindEditable} type="url" required className="form-control bg-dark text-light" placeholder="Profile Picture..." maxLength={255} />
          </div>
          <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 mt-3 d-flex align-items-center justify-content-end">
            <button className="my-prp-btn px-3 py-1 elevation-1 text-light" type="submit">Confirm</button>
          </div>
        </div>
      </form>
      <div className="row mb-4">
        <span className="fs-4 px-0 mt-3 text-center">
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