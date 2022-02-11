namespace AMS.Dto
{
    public class ArticleCommentDto
    {
        public RefereeDto Referee { get; set; }
        public string Comment { get; set; }
        public int Score { get; set; }
        public string Date { get; set; }
    }
}
