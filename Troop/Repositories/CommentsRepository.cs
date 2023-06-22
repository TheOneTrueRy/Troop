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

    internal List<Comment> GetEventComments(int eventId)
    {
      string sql = @"
      SELECT
      comment.*,
      acct.*
      FROM comments comment
      JOIN accounts acct ON comment.creatorId = acct.id
      WHERE comment.eventId = @eventId;
      ";
      List<Comment> comments = _db.Query<Comment, Profile, Comment>(sql, (comment, profile) =>
      {
        comment.Creator = profile;
        return comment;
      }, new { eventId }).ToList();
      return comments;
    }
  }
}