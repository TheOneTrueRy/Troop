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

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Comment>> CreateComment([FromBody] Comment commentData)
    {
      try
      {
        Account userInfo = await _auth.GetUserInfoAsync<Account>(HttpContext);
        commentData.CreatorId = userInfo.Id;
        Comment comment = commentsService.CreateComment(commentData);
        commentData.Creator = userInfo;
        return Ok(comment);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}