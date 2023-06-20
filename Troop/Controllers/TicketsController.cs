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


  }
}