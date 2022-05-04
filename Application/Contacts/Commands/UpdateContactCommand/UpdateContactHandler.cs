using Application.Common.Interfaces;
using Application.Contacts.Queries.GetContact;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Contacts.Commands.UpdateContactCommand
{
    public class UpdateContactHandler : IRequestHandler<UpdateContactCommand, GetContactDto>
    {
        private readonly IApplicationDbContext dbContext;
        private readonly IMapper mapper;

        public UpdateContactHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<GetContactDto> Handle(UpdateContactCommand request, CancellationToken cancellationToken)
        {
            Contact contactToUpdate = await this.dbContext.Contacts
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (contactToUpdate != null)
            {
                contactToUpdate.Update(request.FirstName,
                    request.Surname,
                    request.Address,
                    request.PhoneNumber,
                    request.IBAN,
                    request.DateOfBirth);

                this.dbContext.Contacts.Update(contactToUpdate);
                await this.dbContext.SaveChangesAsync(cancellationToken);

                GetContactDto contactDto = new GetContactDto() 
                {
                    Id = contactToUpdate.Id,
                    FirstName = contactToUpdate.FirstName,
                    Surname = contactToUpdate.Surname,
                    Address = contactToUpdate.Address,
                    PhoneNumber = contactToUpdate.PhoneNumber,
                    IBAN = contactToUpdate.IBAN,
                    DateOfBirth = contactToUpdate.DateOfBirth
                };

                return contactDto;
            }

            return null;
        }
    }
}
