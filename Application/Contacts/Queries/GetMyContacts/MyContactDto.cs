using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;
using System.Globalization;

namespace Application.Contacts.Queries.GetMyContacts
{
    public class MyContactDto : IMapFrom<Contact>
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string IBAN { get; set; }
        public string DateOfBirth { get; set; }

        public void Mapping(Profile profile)
        {
            var deCulture = CultureInfo.GetCultureInfo("de-DE");

            profile.CreateMap<Contact, MyContactDto>()
                .ForMember(mc => mc.DateOfBirth, opt => opt.MapFrom(c => c.DateOfBirth.ToString("d", deCulture)));
        }
    }
}
