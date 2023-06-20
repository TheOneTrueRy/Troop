namespace Troop.Repositories
{
  public class TroopEventsRepository
  {
    private readonly IDbConnection _db;

    public TroopEventsRepository(IDbConnection db)
    {
      _db = db;
    }


  }
}