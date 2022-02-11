using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AMS.Entities.EntityMappings
{
    public class SystemUserEntityTypeMapping : IEntityTypeConfiguration<SystemUser>
    {
        public void Configure(EntityTypeBuilder<SystemUser> builder)
        {
            builder.ToTable("SystemUser");

            builder.Property(e => e.CreateDate).HasColumnType("smalldatetime");

            builder.Property(e => e.FirstName)
                .HasMaxLength(30)
                .IsUnicode(false);

            builder.Property(e => e.LastName)
                .HasMaxLength(30)
                .IsUnicode(false);

            builder.Property(e => e.Mail)
                .HasMaxLength(30)
                .IsUnicode(false);

            builder.Property(e => e.Pass).IsUnicode(false);

            builder.Property(e => e.Phone)
                .HasMaxLength(30)
                .IsUnicode(false);

            builder.Property(e => e.Role)
                .HasMaxLength(10)
                .IsUnicode(false);

            builder.Property(e => e.Title)
                .HasMaxLength(30)
                .IsUnicode(false);
        }
    }
}
