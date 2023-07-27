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
    const user = AppState.account;
    const res = await api.post('api/tickets', { eventId, accountId: user.id })
    AppState.eventTickets.push(new Ticket(res.data))
    AppState.myTickets.push(new Ticket(res.data))
  }
}

export const attendeesService = new AttendeesService();