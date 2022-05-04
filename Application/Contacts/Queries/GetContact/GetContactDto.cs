using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Contacts.Queries.GetContact
{
    public class GetContactDto : IMapFrom<Contact>
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string IBAN { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
    }
}
