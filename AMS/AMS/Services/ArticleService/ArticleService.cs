using System;
using System.Collections.Generic;
using System.Linq;
using AMS.Const;
using AMS.Data;
using AMS.Dto;
using AMS.Entities;
using AutoMapper;

namespace AMS.Services.ArticleService
{
    public class ArticleService : IArticleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ArticleService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ArticleDto GetArticleById(int id)
        {
            var entity = _unitOfWork.Query<Article>().SingleOrDefault(x => x.Id == id);
            var result = _mapper.Map<ArticleDto>(entity);
            result.ArticleComments = entity?.RefereeArticles.Select(x => new ArticleCommentDto()
            {
                Comment = x.Comment,
                Date = x.UpdateDate?.ToString(),
                Score = x.Score ?? 0,
                Referee = _mapper.Map<RefereeDto>(x.Referee)
            }).ToList();

            return result;
        }

        public List<ArticleLightDto> GetArticlesLight(string filter = null)
        {
            var articlesQuery = _unitOfWork.Query<Article>();

            if (!string.IsNullOrEmpty(filter))
            {
                articlesQuery = articlesQuery.Where(x =>
                    x.Title.Contains(filter)
                    || x.AuthorFirstName.Contains(filter)
                    || x.AuthorLastName.Contains(filter));
            }

            return articlesQuery.Select(x => new ArticleLightDto()
            {
                AuthorName = $"{x.AuthorFirstName} {x.AuthorLastName}",
                Id = x.Id,
                State = x.RefereeArticles.Count > 0 ? State.Reviewed.ToString() : State.Waiting.ToString(),
                Title = x.Title
            }).ToList();
        }

        public List<ArticleLightDto> GetRefereeArticles(int refereeId)
        {
            var articles = _unitOfWork.Query<Article>()
                .Where(x => x.RefereeArticles
                    .Select(y => y.RefereeId).Contains(refereeId))
                .Select(x => new ArticleLightDto()
                {
                    AuthorName = $"{x.AuthorFirstName} {x.AuthorLastName}",
                    Id = x.Id,
                    State = x.RefereeArticles.Count > 0 ? State.Reviewed.ToString() : State.Waiting.ToString(),
                    Title = x.Title
                }).ToList();

            return articles;
        }

        public Article CreateArticle(Article article)
        {
            article.CreateDate = DateTime.Now;
            var res = _unitOfWork.AddEntity(article);
            _unitOfWork.SaveChanges();

            return res;
        }

        public void DeleteArticle(int articleId)
        {
            _unitOfWork.DeleteEntity(new Article() {Id = articleId});
            _unitOfWork.SaveChanges();
        }

        public void ReviewArticle(ArticleReviewDto review)
        {
            var reviewEntity = _mapper.Map<RefereeArticle>(review);
            reviewEntity.UpdateDate = DateTime.Now;
            _unitOfWork.UpdateEntity(reviewEntity);
            _unitOfWork.SaveChanges();
        }

        public void RedirectArticle(List<RedirectArticleModel> review)
        {
            var reviewEntity = _mapper.Map<List<RefereeArticle>>(review);
            reviewEntity.ForEach(x => x.UpdateDate = DateTime.Now);
            _unitOfWork.AddRangeEntity(reviewEntity);
            _unitOfWork.SaveChanges();
        }
    }
}
