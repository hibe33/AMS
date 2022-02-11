using AMS.Entities;
using Microsoft.AspNetCore.Http;

namespace AMS.Dto
{
    public class CreateArticleRequest
    {
        public Article Article { get; set; }
        public IFormFile ArticleFile { get; set; }
    }
}
