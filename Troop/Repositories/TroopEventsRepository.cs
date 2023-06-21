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

    internal List<TroopEvent> GetAllEvents()
    {
      string sql = @"
      SELECT * FROM events;
      ";
      List<TroopEvent> troopEvents = _db.Query<TroopEvent>(sql).ToList();
      return troopEvents;
    }

    internal TroopEvent GetEventById(int eventId)
    {
      string sql = @"
      SELECT 
      event.*,
      acct.*
      FROM events event
      JOIN accounts acct on event.creatorId = acct.id
      WHERE event.id = @eventId;
      ";
      TroopEvent troopEvent = _db.Query<TroopEvent, Profile, TroopEvent>(sql, (troopEvent, profile) =>
      {
        troopEvent.Creator = profile;
        return troopEvent;
      }, new { eventId }).FirstOrDefault();
      return troopEvent;
    }

    internal int EditEvent(TroopEvent eventData)
    {
      string sql = @"
      UPDATE events
      SET
      name = @name,
      description = @description,
      location = @location,
      startDate = @startDate,
      isCanceled = @isCanceled
      WHERE id = @id;
      ";
      int rows = _db.Execute(sql, eventData);
      return rows;
    }
  }
}