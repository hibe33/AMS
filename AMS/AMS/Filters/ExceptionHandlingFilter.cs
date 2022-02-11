using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AMS.Filters
{
    public class ExceptionHandlingFilter: IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var message = context.Exception.Message;

            context.Result = new ObjectResult(message)
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
        }
    }
}
