namespace AMS.Data
{
    using System.Threading;
    using System.Threading.Tasks;
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Collections.Generic;

    public abstract class EFCoreGenericRepository<TEntity, TUnitOfWork> : IRepository<TEntity>
        where TEntity : class
        where TUnitOfWork : IUnitOfWork
    {
        private readonly TUnitOfWork unitOfWork;

        protected EFCoreGenericRepository(TUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public virtual TEntity Get(Expression<Func<TEntity, bool>> filter) => this.unitOfWork.Query<TEntity>().SingleOrDefault(filter);
        public virtual TEntity Add(TEntity entity) => this.unitOfWork.AddEntity(entity);
        public virtual void AddRange(IEnumerable<TEntity> entities) => this.unitOfWork.AddRangeEntity(entities);
        public virtual void UpdateRange(IEnumerable<TEntity> entities) => this.unitOfWork.UpdateRangeEntity(entities);
        public virtual void RemoveRange(IEnumerable<TEntity> entities) => this.unitOfWork.RemoveRangeEntity(entities);
        public virtual TEntity Update(TEntity entity) => this.unitOfWork.UpdateEntity(entity);
        public virtual TEntity Delete(TEntity entity) => this.unitOfWork.DeleteEntity(entity);
        public virtual int Save() => this.unitOfWork.SaveChanges();

        public virtual Task<int> SaveAsync(CancellationToken cancellationToken) =>
            this.unitOfWork.SaveChangesAsync(cancellationToken);

        public virtual IQueryable<TEntity> GetListByFilterOrAll(Expression<Func<TEntity, bool>> filter = null)
        {
            return filter == null ? this.unitOfWork.Query<TEntity>()
                                  : this.unitOfWork.Query<TEntity>().Where(filter);
        }

    }
}
