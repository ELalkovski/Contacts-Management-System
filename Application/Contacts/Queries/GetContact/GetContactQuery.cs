using MediatR;

namespace Application.Contacts.Queries.GetContact
{
    public class GetContactQuery : IRequest<GetContactDto>
    {
        public Guid Id { get; set; }
    }
}
