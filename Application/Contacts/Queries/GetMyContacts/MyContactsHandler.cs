using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Contacts.Queries.GetMyContacts
{
    public class MyContactsHandler : IRequestHandler<MyContactsQuery, MyContactsPageDto>
    {
        private readonly IApplicationDbContext dbContext;
        private readonly IMapper mapper;

        public MyContactsHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<MyContactsPageDto> Handle(MyContactsQuery request, CancellationToken cancellationToken)
        {
            List<MyContactDto> contacts = await this.dbContext.Contacts
                .OrderBy(x => x.FirstName)
                .Skip(request.Skip)
                .Take(request.Take)
                .ProjectTo<MyContactDto>(this.mapper.ConfigurationProvider)
                .ToListAsync();

            return new MyContactsPageDto(this.dbContext.Contacts.Count(), contacts);
        }
    }
}
