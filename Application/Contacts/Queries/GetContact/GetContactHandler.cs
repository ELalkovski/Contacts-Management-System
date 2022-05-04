using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Contacts.Queries.GetContact
{
    public class GetContactHandler  : IRequestHandler<GetContactQuery, GetContactDto>
    {
        private readonly IApplicationDbContext dbContext;
        private readonly IMapper mapper;

        public GetContactHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<GetContactDto> Handle(GetContactQuery request, CancellationToken cancellationToken)
        {
            GetContactDto contactDto = await this.dbContext.Contacts
                .Where(x => x.Id == request.Id)
                .ProjectTo<GetContactDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            return contactDto;
        }
    }
}
