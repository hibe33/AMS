using System;
using System.Collections.Generic;
using System.IO;
using AMS.Dto;
using AMS.Entities;
using AMS.Services.ArticleService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AMS.Controllers
{
    public class ArticleController : ApiController
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet]
        public IActionResult GetArticles([FromQuery] string filter)
        {
            return Ok(_articleService.GetArticlesLight(filter));
        }


        [HttpGet]
        [Route("{id}")]
        public IActionResult Get([FromRoute]int id)
        {
            return Ok(_articleService.GetArticleById(id));
        }

        [HttpGet]
        [Route("GetRefereeArticles")]
        public IActionResult GetRefereeArticles([FromQuery] int refereeId)
        {
            return Ok(_articleService.GetRefereeArticles(refereeId));
        }

        [HttpPost("UploadArticleFile")]
        public IActionResult CreateArticleFile(IFormFile article)
        {
            var file = article;
            try
            {
                if (Path.GetExtension(file.FileName) != ".pdf")
                {
                    throw new ApplicationException("File must be pdf!");
                }

                var uniqueFileName = Guid.NewGuid() + "_" + file.FileName;
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/articles", uniqueFileName);
                var stream = new FileStream(path, FileMode.Create);
                file.CopyToAsync(stream);

                return Ok($"{{\"addedFile\" : \"{uniqueFileName}\"}}");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateArticle(Article article)
        {
            var result = _articleService.CreateArticle(article);
            return Ok(result);
        }

        [HttpPost]
        [Route("Redirect")]
        public IActionResult CreateArticle(List<RedirectArticleModel> redirect)
        {
            _articleService.RedirectArticle(redirect);
            return Ok();
        }

        [HttpPost]
        [Route("Review")]
        public IActionResult CreateArticle(ArticleReviewDto review)
        {
            _articleService.ReviewArticle(review);
            return Ok();
        }
    }
}
