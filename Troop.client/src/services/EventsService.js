import { Router } from "react-router-dom";
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

  async getEvent(eventId) {
    AppState.event = null
    const res = await api.get(`api/events/${eventId}`)
    AppState.event = new Event(res.data)
    AppState.event.startDate = new Date(AppState.event.startDate).toLocaleDateString('fr-CA')
  }

  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    AppState.event = new Event(res.data)
    AppState.eventTickets = [];
    let eventTicketIndex = AppState.myTickets.findIndex(t => t.eventId == AppState.event.id)
    AppState.myTickets.splice(eventTicketIndex, 1)
  }

  async editEvent(eventData) {
    const res = await api.put(`api/events/${eventData.id}`, eventData)
    let eventIndex = AppState.events.findIndex(e => e.id == eventData.id)
    AppState.event = new Event(res.data)
    AppState.events.splice(eventIndex, 1, new Event(res.data))
  }

  async createEvent(eventData) {
    const res = await api.post(`api/events`, eventData)
    AppState.events.push(new Event(res.data))
    return res.data.id
  }

}

export const eventsService = new EventsService();