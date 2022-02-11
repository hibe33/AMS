namespace AMS.Data
{
    using Microsoft.EntityFrameworkCore.Storage;
    using System.Threading;
    using System.Threading.Tasks;

    public interface ITransactionManager
    {
        IDbContextTransaction BeginTransaction();
    }
}
