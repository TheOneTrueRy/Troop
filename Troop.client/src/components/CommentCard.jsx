import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import React from 'react';

function CommentCard({ comment }) {

  return (

    <div className="row">
      <div className="col-2">
        <img src={comment.creator.picture} alt={`${comment.creator.name}`} className="comment-picture elevation-1" />
      </div>
      <div className="col-10 comment-body d-flex flex-column py-1">
        <span className="fw-bold">
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