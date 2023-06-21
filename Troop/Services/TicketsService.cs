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

    internal Ticket GetOneTicket(int ticketId)
    {
      Ticket ticket = _repo.GetOneTicket(ticketId);
      return ticket;
    }

    internal string DeleteTicket(int ticketId, string userId)
    {
      Ticket ticket = this.GetOneTicket(ticketId);
      if (ticket.AccountId != userId)
      {
        throw new Exception("You can't delete somebody elses ticket!");
      }
      bool result = _repo.DeleteTicket(ticketId);
      if (!result)
      {
        throw new Exception($"Something went wrong trying to delete the ticket at the Id of {ticketId}");
      }
      return $"Successfully deleted the ticket at the Id of {ticketId}";
    }
  }
}