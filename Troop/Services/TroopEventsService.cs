namespace Troop.Services
{
  public class TroopEventsService
  {
    private readonly TroopEventsRepository _repo;

    public TroopEventsService(TroopEventsRepository repo)
    {
      _repo = repo;
    }


  }
}