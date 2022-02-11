using AMS.Data;
using AMS.Services.ArticleService;
using AMS.Services.UserService;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AMS
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IArticleService, ArticleService>();
            services.AddScoped<IUserService, UserService>();

            services.AddDbContext<IUnitOfWork, AMSContext>(b =>
                b.UseLazyLoadingProxies().UseSqlServer(configuration.GetConnectionString("app-db")));

            #region Auto Mapper Configuration
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
            #endregion

            return services;
        }
    }
}
