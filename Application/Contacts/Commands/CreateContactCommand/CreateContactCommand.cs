using MediatR;

namespace Application.Contacts.Commands.CreateContactCommand
{
    public class CreateContactCommand : IRequest<Guid>
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string IBAN { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
    }
}
