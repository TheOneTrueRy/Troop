namespace Troop.Services
{
  public class TicketsService
  {
    private readonly TicketsRepository _repo;
    private readonly TroopEventsService troopEventsService;

    public TicketsService(TicketsRepository repo, TroopEventsService troopEventsService)
    {
      _repo = repo;
      this.troopEventsService = troopEventsService;
    }

    internal Ticket CreateTicket(Ticket ticketData)
    {
      TroopEvent troopEvent = troopEventsService.GetEventById(ticketData.EventId);
      if (troopEvent.Capacity == 0)
      {
        throw new Exception("You can not create a ticket for an event that is at full capacity.");
      }
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

    internal List<Ticket> GetEventTickets(int eventId)
    {
      List<Ticket> tickets = _repo.GetEventTickets(eventId);
      return tickets;
    }
  }
}