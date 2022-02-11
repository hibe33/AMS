using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using AMS.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace AMS.Data
{
    public partial class AMSContext : DbContext, IUnitOfWork, ITransactionManager
    {
        public AMSContext()
        {
        }

        public AMSContext(DbContextOptions<AMSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Article> Articles { get; set; }
        public virtual DbSet<RefereeArticle> RefereeArticles { get; set; }
        public virtual DbSet<SystemUser> SystemUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            //{
            //    optionsBuilder.UseSqlServer("Server=DESKTOP-QC07D4O\\SQLEXPRESS; Database=AMS; Trusted_Connection=True");
            //}
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Turkish_CI_AS");

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
        public IQueryable<TEntity> Query<TEntity>() where TEntity : class
        {
            return base.Set<TEntity>();
        }

        public TEntity AddEntity<TEntity>(TEntity entity) where TEntity : class
        {
            var addedEntry = this.Entry(entity);
            addedEntry.State = EntityState.Added;
            return entity;
        }

        public TEntity UpdateEntity<TEntity>(TEntity entity) where TEntity : class
        {
            var updatedEntry = this.Entry(entity);
            updatedEntry.State = EntityState.Modified;
            return entity;
        }

        public TEntity DeleteEntity<TEntity>(TEntity entity) where TEntity : class
        {
            var deletedEntry = this.Entry(entity);
            deletedEntry.State = EntityState.Deleted;
            return entity;
        }

        public void AddRangeEntity<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
        {
            base.Set<TEntity>().AddRange(entities);
        }

        public void UpdateRangeEntity<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
        {
            base.Set<TEntity>().UpdateRange(entities);
        }

        public void RemoveRangeEntity<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
        {
            base.Set<TEntity>().RemoveRange(entities);
        }

        public IDbContextTransaction BeginTransaction()
        {
            return base.Database.BeginTransaction();
        }
    }
}
