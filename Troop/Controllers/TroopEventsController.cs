namespace Troop.Controllers
{
  [ApiController]
  [Route("api/events")]
  public class TroopEventsController : ControllerBase
  {
    private readonly TroopEventsService troopEventsService;
    private readonly TicketsService ticketsService;
    private readonly CommentsService commentsService;
    private readonly Auth0Provider _auth;

    public TroopEventsController(TroopEventsService troopEventsService, Auth0Provider auth, TicketsService ticketsService, CommentsService commentsService)
    {
      this.troopEventsService = troopEventsService;
      _auth = auth;
      this.ticketsService = ticketsService;
      this.commentsService = commentsService;
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

    [HttpPut("{eventId}")]
    [Authorize]
    public async Task<ActionResult<TroopEvent>> EditEvent(int eventId, [FromBody] TroopEvent eventData)
    {
      try
      {
        Account userInfo = await _auth.GetUserInfoAsync<Account>(HttpContext);
        eventData.CreatorId = userInfo.Id;
        eventData.Id = eventId;
        TroopEvent editedEvent = troopEventsService.EditEvent(eventData);
        return Ok(editedEvent);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpDelete("{eventId}")]
    [Authorize]
    public async Task<ActionResult<TroopEvent>> CancelEvent(int eventId)
    {
      try
      {
        Account userInfo = await _auth.GetUserInfoAsync<Account>(HttpContext);
        TroopEvent canceledEvent = troopEventsService.CancelEvent(eventId, userInfo.Id);
        return Ok(canceledEvent);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("{eventId}/tickets")]
    public ActionResult<List<Ticket>> GetEventTickets(int eventId)
    {
      try
      {
        List<Ticket> tickets = ticketsService.GetEventTickets(eventId);
        return Ok(tickets);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("{eventId}/comments")]
    public ActionResult<List<Comment>> GetEventComments(int eventId)
    {
      try
      {
        List<Comment> comments = commentsService.GetEventComments(eventId);
        return Ok(comments);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}