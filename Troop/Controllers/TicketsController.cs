namespace Troop.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TicketsController : ControllerBase
  {
    private readonly TicketsService ticketsService;
    private readonly Auth0Provider _auth;

    public TicketsController(TicketsService ticketsService, Auth0Provider auth)
    {
      this.ticketsService = ticketsService;
      _auth = auth;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Ticket>> CreateTicket([FromBody] Ticket ticketData)
    {
      try
      {
        Account userInfo = await _auth.GetUserInfoAsync<Account>(HttpContext);
        ticketData.AccountId = userInfo.Id;
        Ticket ticket = ticketsService.CreateTicket(ticketData);
        return Ok(ticket);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpDelete("{ticketId}")]
    [Authorize]
    public async Task<ActionResult<string>> DeleteTicket(int ticketId)
    {
      try
      {
        Account userInfo = await _auth.GetUserInfoAsync<Account>(HttpContext);
        string message = ticketsService.DeleteTicket(ticketId, userInfo.Id);
        return Ok(message);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}