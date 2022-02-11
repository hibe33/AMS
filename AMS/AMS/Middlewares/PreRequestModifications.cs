using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AMS.Middlewares
{
    public class PreRequestModifications
    {

        private readonly RequestDelegate _next;

        public PreRequestModifications(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            await _next.Invoke(context);
            context.Response.Headers["asdfasdfasdf"] = "sadfasdfasd";

        }
    }
}
