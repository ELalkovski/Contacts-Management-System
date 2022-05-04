using Application.Contacts.Queries.GetContact;
using MediatR;

namespace Application.Contacts.Commands.UpdateContactCommand
{
    public class UpdateContactCommand : IRequest<GetContactDto>
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
