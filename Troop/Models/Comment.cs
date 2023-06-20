namespace Troop.Models
{
  public class Comment
  {
    public int Id { get; set; }
    public string CreatorId { get; set; }
    public int EventId { get; set; }
    public string Body { get; set; }
    public Profile Creator { get; set; }
  }
}