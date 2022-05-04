using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class ContactConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.FirstName)
                .IsRequired(true)
                .HasMaxLength(24);

            builder.Property(x => x.Surname)
                .IsRequired(true)
                .HasMaxLength(24);

            builder.Property(x => x.Address)
                .IsRequired(false);

            builder.Property(x => x.PhoneNumber)
                .IsRequired(false);

            builder.Property(x => x.IBAN)
                .IsRequired(true)
                .HasMaxLength(34);

            builder.Property(x => x.DateOfBirth)
                .IsRequired(true);
        }
    }
}
