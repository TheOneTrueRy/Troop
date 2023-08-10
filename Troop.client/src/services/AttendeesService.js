import { AppState } from "../AppState.js";
import { Ticket } from "../models/Ticket.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class AttendeesService {
  async getEventTickets(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.eventTickets = res.data.map(t => new Ticket(t))
    logger.log(AppState.eventTickets)
  }

  async attendEvent(eventId) {
    const res = await api.post('api/tickets', { eventId })
    let ticket = new Ticket(res.data)
    ticket.profile = AppState.account
    ticket.event = AppState.event
    AppState.eventTickets.push(ticket)
    AppState.myTickets.push(ticket)
  }

  async unattendEvent(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    let eventTicketsIndex = AppState.eventTickets.findIndex(t => t.id == ticketId)
    AppState.eventTickets.splice(eventTicketsIndex, 1)
    let myTicketsIndex = AppState.myTickets.findIndex(t => t.id == ticketId)
    AppState.myTickets.splice(myTicketsIndex, 1)
  }
}

export const attendeesService = new AttendeesService();