namespace Troop.Services
{
  public class CommentsService
  {
    private readonly CommentsRepository _repo;

    public CommentsService(CommentsRepository repo)
    {
      _repo = repo;
    }

    internal Comment CreateComment(Comment commentData)
    {
      Comment comment = _repo.CreateComment(commentData);
      return comment;
    }

    internal List<Comment> GetEventComments(int eventId)
    {
      List<Comment> comments = _repo.GetEventComments(eventId);
      return comments;
    }

    internal Comment GetOneComment(int commentId)
    {
      Comment comment = _repo.GetOneComment(commentId);
      return comment;
    }

    internal string DeleteComment(int commentId, string userId)
    {
      Comment comment = this.GetOneComment(commentId);
      if (comment.CreatorId != userId)
      {
        throw new Exception("You can not delete a comment you did not create.");
      }
      bool result = _repo.DeleteComment(commentId);
      if (!result)
      {
        throw new Exception($"Something went wrong trying to delete the comment at the Id of {commentId}");
      }
      return $"Successfully deleted the comment at the Id of {commentId}";
    }
  }
}