namespace Troop.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class CommentsController : ControllerBase
  {
    private readonly CommentsService commentsService;
    private readonly Auth0Provider _auth;

    public CommentsController(CommentsService commentsService, Auth0Provider auth)
    {
      this.commentsService = commentsService;
      _auth = auth;
    }


  }
}