import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";
import { Ticket } from "../models/Ticket.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class EventsService {
  async getEvents() {
    const res = await api.get('api/events')
    logger.log('All Events:', res.data)
    AppState.events = res.data.map(e => new Event(e))
    AppState.filteredEvents = res.data.map(e => new Event(e))
    logger.log('Mapped AppState Events:', AppState.events)
  }

  changeFilter(category) {
    if (category == 'all') {
      AppState.filteredEvents = AppState.events
    } else {
      AppState.filteredEvents = AppState.events.filter(e => e.type == category)
    }
  }

  async getEvent(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    AppState.event = new Event(res.data)
  }

  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    AppState.event.isCanceled = true
  }

}

export const eventsService = new EventsService();