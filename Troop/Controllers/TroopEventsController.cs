namespace Troop.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TroopEventsController : ControllerBase
  {
    private readonly TroopEventsService troopEventsService;
    private readonly Auth0Provider _auth;

    public TroopEventsController(TroopEventsService troopEventsService, Auth0Provider auth)
    {
      this.troopEventsService = troopEventsService;
      _auth = auth;
    }


  }
}