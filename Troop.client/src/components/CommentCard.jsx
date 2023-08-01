import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import React from 'react';

function CommentCard({ comment }) {

  return (

    <div className="row my-3">
      <div className="col-2 px-1 text-center">
        <img src={comment.creator.picture} alt={`${comment.creator.name}`} className="comment-picture elevation-3" />
      </div>
      <div className="col-10 comment-body d-flex flex-column py-2 rounded bg-gradient">
        <span className="fw-bold pb-1">
          {comment.creator.name}
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