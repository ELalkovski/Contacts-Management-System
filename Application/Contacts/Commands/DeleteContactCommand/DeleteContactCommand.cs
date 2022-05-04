using MediatR;

namespace Application.Contacts.Commands.DeleteContactCommand
{
    public class DeleteContactCommand : IRequest<bool>
    {
        public Guid Id { get; set; }
    }
}
