import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async getEventComments(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data.map(c => new Comment(c))
  }
}

export const commentsService = new CommentsService();