import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";
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
}

export const eventsService = new EventsService();