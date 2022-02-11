using System.Collections.Generic;
using AMS.Dto;
using AMS.Entities;

namespace AMS.Services.ArticleService
{
    public interface IArticleService
    {
        public ArticleDto GetArticleById(int id);
        public List<ArticleLightDto> GetArticlesLight(string filter = null);
        public List<ArticleLightDto> GetRefereeArticles(int refereeId);
        public Article CreateArticle(Article article);
        public void DeleteArticle(int articleId);
        public void ReviewArticle(ArticleReviewDto review);
        public void RedirectArticle(List<RedirectArticleModel> review);
    }
}
