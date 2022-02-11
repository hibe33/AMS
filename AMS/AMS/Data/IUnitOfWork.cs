namespace AMS.Data
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    public interface IUnitOfWork
    {
        IQueryable<TEntity> Query<TEntity>() where TEntity : class;
        TEntity AddEntity<TEntity>([NotNull] TEntity entity) where TEntity : class;
        TEntity UpdateEntity<TEntity>([NotNull] TEntity entity) where TEntity : class;
        TEntity DeleteEntity<TEntity>([NotNull] TEntity entity) where TEntity : class;
        void AddRangeEntity<TEntity>([NotNull] IEnumerable<TEntity> entities) where TEntity : class;
        void UpdateRangeEntity<TEntity>([NotNull] IEnumerable<TEntity> entities) where TEntity : class;
        void RemoveRangeEntity<TEntity>([NotNull] IEnumerable<TEntity> entities) where TEntity : class;
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
