using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Contacts.Commands.CreateContactCommand
{
    public class CreateContactHandler : IRequestHandler<CreateContactCommand, Guid>
    {
        private readonly IApplicationDbContext dbContext;

        public CreateContactHandler(IApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Guid> Handle(CreateContactCommand request, CancellationToken cancellationToken)
        {
            var contact = new Contact(request.FirstName,
                request.Surname,
                request.DateOfBirth,
                request.Address,
                request.PhoneNumber,
                request.IBAN);

            this.dbContext.Contacts.Add(contact);
            await this.dbContext.SaveChangesAsync(cancellationToken);

            return contact.Id;
        }
    }
}
