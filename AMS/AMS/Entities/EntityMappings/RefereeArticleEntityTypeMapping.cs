using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AMS.Entities.EntityMappings
{
    public class RefereeArticleEntityTypeMapping : IEntityTypeConfiguration<RefereeArticle>
    {
        public void Configure(EntityTypeBuilder<RefereeArticle> builder)
        {
            builder.HasKey(e => new { e.ArticleId, e.RefereeId })
                .HasName("PK__RefereeA__2C24FEBAA9F94638");

            builder.ToTable("RefereeArticle");

            builder.Property(e => e.Comment).IsUnicode(false);

            builder.Property(e => e.State)
                .HasMaxLength(10)
                .IsUnicode(false);

            builder.Property(e => e.UpdateDate).HasColumnType("smalldatetime");

            builder.HasOne(d => d.Article)
                .WithMany(p => p.RefereeArticles)
                .HasForeignKey(d => d.ArticleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__RefereeAr__Artic__145C0A3F");

            builder.HasOne(d => d.Referee)
                .WithMany(p => p.RefereeArticles)
                .HasForeignKey(d => d.RefereeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__RefereeAr__Refer__15502E78");
        }
    }
}
