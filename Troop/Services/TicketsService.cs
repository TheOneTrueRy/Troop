namespace Troop.Services
{
  public class TicketsService
  {
    private readonly TicketsRepository _repo;

    public TicketsService(TicketsRepository repo)
    {
      _repo = repo;
    }

    internal Ticket CreateTicket(Ticket ticketData)
    {
      Ticket ticket = _repo.CreateTicket(ticketData);
      return ticket;
    }
  }
}