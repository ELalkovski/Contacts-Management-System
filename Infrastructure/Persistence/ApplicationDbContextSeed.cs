using Application.Common.Interfaces;
using Domain.Entities;

namespace Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedInitialContacts(IApplicationDbContext applicationDbContext)
        {
            if (!applicationDbContext.Contacts.Any())
            {
                List<Contact> initialContacts = new List<Contact>()
                {
                    new Contact("John", "Doe", new DateTimeOffset(new DateTime(1990, 12, 1)), "Test Str. 12", "0898606303", "BG80BNBG96611020345678"),
                    new Contact("Peter", "Johnson", new DateTimeOffset(new DateTime(1995, 5, 13)), "George Str. 24", "0855506103", "HR1210010051863000160"),
                    new Contact("Samantha", "Johnson", new DateTimeOffset(new DateTime(1985, 1, 1)), "Main Str. 03", "0988802103", "BE68539007547034"),
                    new Contact("Jenifer", "Garcia", new DateTimeOffset(new DateTime(1988, 8, 9)), "Main Str. 09", "0999921039", "CZ6508000000192000145399"),
                    new Contact("Michael", "Madson", new DateTimeOffset(new DateTime(1998, 11, 9)), "George Str. 09", "0978944059", "DK5000400440116243"),
                    new Contact("Jane", "Doe", new DateTimeOffset(new DateTime(1992, 6, 25)), "Test Str. 18", "0855506303", "EE382200221020145685"),
                    new Contact("Memphis", "Ranes", new DateTimeOffset(new DateTime(1988, 5, 13)), "Optimus Str. 155", "0832146103", "FO2000400440116243"),
                    new Contact("Zaraki", "Kenpachi", new DateTimeOffset(new DateTime(1982, 3, 15)), "Tackle Str. 53", "0921102573", "FI2112345600000785"),
                    new Contact("Kurosaki", "Ichigo", new DateTimeOffset(new DateTime(1988, 8, 9)), "No Str. 19", "0999921039", "DE89370400440532013000"),
                    new Contact("Ann", "Libeira", new DateTimeOffset(new DateTime(1983, 4, 7)), "Dance Str. 1", "0978944059", "GR1601101250000000012300695"),
                };

                applicationDbContext.Contacts.AddRange(initialContacts);
                await applicationDbContext.SaveChangesAsync(new CancellationToken());
            }
            
        }
    }
}
