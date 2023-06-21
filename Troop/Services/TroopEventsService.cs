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

    internal TroopEvent GetEventById(int eventId)
    {
      TroopEvent troopEvent = _repo.GetEventById(eventId);
      return troopEvent;
    }

    internal TroopEvent EditEvent(TroopEvent eventData)
    {
      TroopEvent original = this.GetEventById(eventData.Id);
      if (original.CreatorId != eventData.CreatorId)
      {
        throw new Exception("You can not edit an event you did not create.");
      }
      original.Name = eventData.Name != null ? eventData.Name : original.Name;
      original.Description = eventData.Description != null ? eventData.Description : original.Description;
      original.Location = eventData.Location != null ? eventData.Location : original.Location;
      original.StartDate = eventData.StartDate != null ? eventData.StartDate : original.StartDate;
      original.IsCanceled = eventData.IsCanceled == true ? eventData.IsCanceled : original.IsCanceled;
      _repo.EditEvent(original);
      return original;
    }
  }
}