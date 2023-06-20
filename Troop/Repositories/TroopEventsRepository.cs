namespace Troop.Repositories
{
  public class TroopEventsRepository
  {
    private readonly IDbConnection _db;

    public TroopEventsRepository(IDbConnection db)
    {
      _db = db;
    }

    internal TroopEvent CreateEvent(TroopEvent eventData)
    {
      string sql = @"
      INSERT INTO events
      (creatorId, name, description, coverImg, location, capacity, startDate, type)
      VALUES
      (@creatorId, @name, @description, @coverImg, @location, @capacity, @startDate, @type);
      SELECT LAST_INSERT_ID();
      ";
      int id = _db.ExecuteScalar<int>(sql, eventData);
      eventData.Id = id;
      return eventData;
    }
  }
}