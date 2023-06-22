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
  }
}