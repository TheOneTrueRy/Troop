namespace Troop.Models
{
  public class Ticket
  {
    public int Id { get; set; }
    public int EventId { get; set; }
    public string AccountId { get; set; }
    public Profile Profile { get; set; }
    public TroopEvent Event { get; set; }
  }
}