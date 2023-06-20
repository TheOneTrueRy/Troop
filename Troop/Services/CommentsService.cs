namespace Troop.Services
{
  public class CommentsService
  {
    private readonly CommentsRepository _repo;

    public CommentsService(CommentsRepository repo)
    {
      _repo = repo;
    }


  }
}