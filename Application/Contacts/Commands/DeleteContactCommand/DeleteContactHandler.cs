using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Contacts.Commands.DeleteContactCommand
{
    public class DeleteContactHandler : IRequestHandler<DeleteContactCommand, bool>
    {
        private readonly IApplicationDbContext dbContext;

        public DeleteContactHandler(IApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> Handle(DeleteContactCommand request, CancellationToken cancellationToken)
        {
            Contact contactToDelete = await this.dbContext.Contacts
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (contactToDelete != null)
            {
                this.dbContext.Contacts.Remove(contactToDelete);
                await this.dbContext.SaveChangesAsync(cancellationToken);

                return true;
            }

            return false;
        }
    }
}
