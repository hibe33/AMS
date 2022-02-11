using AMS.Dto;
using AMS.Entities;
using AutoMapper;

namespace AMS
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RefereeArticle, ArticleReviewDto>().ReverseMap();
            CreateMap<RedirectArticleModel, RefereeArticle>().ReverseMap();
            CreateMap<Article, ArticleDto>().ReverseMap();
            CreateMap<SystemUser, RefereeDto>().ReverseMap();
            CreateMap<Article, ArticleLightDto>().ForMember(m => 
                m.AuthorName, opt => opt.MapFrom<NameResolver>());
        }
    }


    class NameResolver : IValueResolver<Article, ArticleLightDto, string>
    {
        public string Resolve(Article source, ArticleLightDto destination, string destMember, ResolutionContext context)
        {
            return $"{source.AuthorFirstName} {source.AuthorLastName}";
        }
    }
}
