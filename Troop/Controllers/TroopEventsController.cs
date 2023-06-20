namespace Troop.Controllers
{
  [ApiController]
  [Route("api/events")]
  public class TroopEventsController : ControllerBase
  {
    private readonly TroopEventsService troopEventsService;
    private readonly Auth0Provider _auth;

    public TroopEventsController(TroopEventsService troopEventsService, Auth0Provider auth)
    {
      this.troopEventsService = troopEventsService;
      _auth = auth;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<TroopEvent>> CreateEvent([FromBody] TroopEvent eventData)
    {
      try
      {
        Account userInfo = await _auth.GetUserInfoAsync<Account>(HttpContext);
        eventData.CreatorId = userInfo.Id;
        TroopEvent troopEvent = troopEventsService.CreateEvent(eventData);
        troopEvent.Creator = userInfo;
        return Ok(troopEvent);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet]
    public ActionResult<List<TroopEvent>> GetAllEvents()
    {
      try
      {
        List<TroopEvent> troopEvents = troopEventsService.GetAllEvents();
        return Ok(troopEvents);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("{eventId}")]
    public ActionResult<TroopEvent> GetEventById(int eventId)
    {
      try
      {
        TroopEvent troopEvent = troopEventsService.GetEventById(eventId);
        return Ok(troopEvent);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}