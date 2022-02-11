using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AMS.Entities.EntityMappings
{
    public class ArticleEntityTypeMapping : IEntityTypeConfiguration<Article>
    {
        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.ToTable("Article");

            builder.Property(e => e.AuthorFirstName)
                .HasMaxLength(30)
                .IsUnicode(false);

            builder.Property(e => e.AuthorLastName)
                .HasMaxLength(30)
                .IsUnicode(false);

            builder.Property(e => e.AuthorMail)
                .HasMaxLength(30)
                .IsUnicode(false);

            builder.Property(e => e.AuthorNotes).IsUnicode(false);

            builder.Property(e => e.AuthorPhone)
                .HasMaxLength(30)
                .IsUnicode(false);

            builder.Property(e => e.CreateDate)
                .HasColumnType("smalldatetime");

            builder.Property(e => e.FileName).IsUnicode(false);

            builder.Property(e => e.Title).IsUnicode(false);
            
        }

        //public void Configure(EntityTypeBuilder<AllVendor> builder)
        //{
        //    builder.HasKey(e => e.Vendor)
        //        .HasName("ALL_VENDORS_PK");

        //    builder.ToTable("ALL_VENDORS");

        //    builder.Property(e => e.Vendor)
        //        .HasMaxLength(50)
        //        .IsUnicode(false)
        //        .HasColumnName("VENDOR");

        //    builder.Property(e => e.Displayname)
        //        .HasMaxLength(100)
        //        .IsUnicode(false)
        //        .HasColumnName("DISPLAYNAME");

        //    builder.Property(e => e.Ind)
        //        .HasPrecision(4)
        //        .HasColumnName("IND");
        //}

    }
}
