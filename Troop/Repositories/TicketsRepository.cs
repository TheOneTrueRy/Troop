namespace Troop.Repositories
{
  public class TicketsRepository
  {
    private readonly IDbConnection _db;

    public TicketsRepository(IDbConnection db)
    {
      _db = db;
    }

    internal Ticket CreateTicket(Ticket ticketData)
    {
      string sql = @"
      INSERT INTO tickets
      (eventId, accountId)
      VALUES
      (@eventId, @accountId);
      SELECT LAST_INSERT_ID();
      UPDATE events
      SET
      capacity = capacity - 1
      WHERE id = @eventId;
      ";
      int id = _db.ExecuteScalar<int>(sql, ticketData);
      ticketData.Id = id;
      return ticketData;
    }

    internal List<Ticket> GetMyTickets(string userId)
    {
      string sql = @"
      SELECT
      ticket.*,
      event.*
      FROM tickets ticket
      JOIN events event on ticket.eventId = event.id
      WHERE ticket.accountId = @userId;
      ";
      List<Ticket> tickets = _db.Query<Ticket, TroopEvent, Ticket>(sql, (ticket, troopEvent) =>
      {
        ticket.Event = troopEvent;
        return ticket;
      }, new { userId }).ToList();
      return tickets;
    }

    internal Ticket GetOneTicket(int ticketId)
    {
      string sql = @"
      SELECT
      *
      FROM  tickets
      WHERE id = @ticketId;
      ";
      Ticket ticket = _db.Query<Ticket>(sql, new { ticketId }).FirstOrDefault();
      return ticket;
    }

    internal bool DeleteTicket(int ticketId)
    {
      string sql = @"
      DELETE FROM tickets
      WHERE id = @ticketId;
      ";
      int rows = _db.Execute(sql, new { ticketId });
      return rows == 1;
    }
  }
}