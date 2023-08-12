import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async getEventComments(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data.map(c => new Comment(c))
  }

  async postComment(commentData) {
    const res = await api.post(`api/comments`, commentData)
    commentData = res.data
    commentData.creator = AppState.account
    AppState.comments.push(new Comment(commentData))
  }

  async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    let commentIndex = AppState.comments.findIndex(c => c.id == commentId)
    AppState.comments.splice(commentIndex, 1)
  }
}

export const commentsService = new CommentsService();