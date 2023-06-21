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

    internal List<Ticket> GetMyTickets(string userId)
    {
      List<Ticket> tickets = _repo.GetMyTickets(userId);
      return tickets;
    }
  }
}