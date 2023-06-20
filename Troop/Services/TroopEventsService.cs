namespace Troop.Services
{
  public class TroopEventsService
  {
    private readonly TroopEventsRepository _repo;

    public TroopEventsService(TroopEventsRepository repo)
    {
      _repo = repo;
    }

    internal TroopEvent CreateEvent(TroopEvent eventData)
    {
      TroopEvent troopEvent = _repo.CreateEvent(eventData);
      return troopEvent;
    }

    internal List<TroopEvent> GetAllEvents()
    {
      List<TroopEvent> troopEvents = _repo.GetAllEvents();
      return troopEvents;
    }
  }
}