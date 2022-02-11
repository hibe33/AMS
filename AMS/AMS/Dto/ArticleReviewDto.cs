namespace AMS.Dto
{
    public class ArticleReviewDto
    {
        public int ArticleId { get; set; }
        public int RefereeId { get; set; }
        public string Comment { get; set; }
        public int? Score { get; set; }
    }
}
