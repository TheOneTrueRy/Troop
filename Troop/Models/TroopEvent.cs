namespace Troop.Models
{
  public class TroopEvent
  {
    public int Id { get; set; }
    public string CreatorId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string CoverImg { get; set; }
    public string Location { get; set; }
    public int Capacity { get; set; }
    public string StartDate { get; set; }
    public bool IsCanceled { get; set; }
    public string Type { get; set; }
    public Profile Creator { get; set; }
  }
}