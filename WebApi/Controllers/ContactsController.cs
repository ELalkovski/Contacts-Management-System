using Application.Contacts.Commands.CreateContactCommand;
using Application.Contacts.Commands.DeleteContactCommand;
using Application.Contacts.Commands.UpdateContactCommand;
using Application.Contacts.Queries.GetContact;
using Application.Contacts.Queries.GetMyContacts;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/contacts")]
    public class ContactsController : ApiControllerBase
    {
        [HttpPost]
        public async Task<Guid> Post([FromBody] CreateContactCommand createContactCommand)
        {
            return await Mediator.Send(createContactCommand);
        }

        [HttpPut("{id}")]
        public async Task<GetContactDto> Put([FromBody] UpdateContactCommand updateContactCommand)
        {
            return await Mediator.Send(updateContactCommand);
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete(Guid id)
        {
            return await Mediator.Send(new DeleteContactCommand()
            {
                Id = id
            });
        }

        [HttpGet]
        public async Task<MyContactsPageDto> GetMyContacts(int skip, int take)
        {
            return await Mediator.Send(new MyContactsQuery()
            {
                Skip = skip,
                Take = take
            });
        }

        [HttpGet("{id}")]
        public async Task<GetContactDto> GetContact(Guid id)
        {
            return await Mediator.Send(new GetContactQuery()
            {
                Id = id
            });
        }
    }
}
