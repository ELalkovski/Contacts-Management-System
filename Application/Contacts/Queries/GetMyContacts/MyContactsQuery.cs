using MediatR;

namespace Application.Contacts.Queries.GetMyContacts
{
    public class MyContactsQuery : IRequest<MyContactsPageDto>
    {
        public int Take { get; set; }
        public int Skip { get; set; }
    }
}
