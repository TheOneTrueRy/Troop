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
  }
}