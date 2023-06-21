namespace Troop.Repositories
{
  public class CommentsRepository
  {
    private readonly IDbConnection _db;

    public CommentsRepository(IDbConnection db)
    {
      _db = db;
    }

    internal Comment CreateComment(Comment commentData)
    {
      string sql = @"
      INSERT INTO comments
      (body, creatorId, eventId)
      VALUES
      (@body, @creatorId, @eventId);
      SELECT LAST_INSERT_ID();
      ";
      int id = _db.ExecuteScalar<int>(sql, commentData);
      commentData.Id = id;
      return commentData;
    }
  }
}