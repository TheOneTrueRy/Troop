import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FaTrash } from "react-icons/fa";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { commentsService } from "../services/CommentsService.js";

function CommentCard({ comment }) {

  async function deleteComment() {
    try {
      if (await Pop.confirm('Are you sure you wish to delete this comment? This is IRREVERSIBLE.')) {
        await commentsService.deleteComment(comment.id)
      }
    }
    catch (error) {
      Pop.error(error);
    }
  }

  return (

    <div className="row my-3">
      <div className="col-2 px-1 text-center">
        <img src={comment.creator.picture} alt={`${comment.creator.name}`} className="comment-picture elevation-3" />
      </div>
      <div className="col-10 comment-body d-flex flex-column py-2 rounded bg-gradient">
        <span className="fw-bold pb-1 d-flex justify-content-between align-items-center">
          {comment.creator.name}
          {AppState.account.id == comment.creator.id && <button className="btn py-1 px-2 no-border canceled" title="Delete Your Comment." type="button" onClick={deleteComment}>
            <FaTrash className="d-flex" />
          </button>}
        </span>
        <span className="">
          {comment.body}
        </span>
      </div>
    </div>
  )

}

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired
}

export default observer(CommentCard)