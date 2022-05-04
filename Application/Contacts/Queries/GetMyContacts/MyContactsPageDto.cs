namespace Application.Contacts.Queries.GetMyContacts
{
    public class MyContactsPageDto
    {
        public MyContactsPageDto(int totalCount, List<MyContactDto> contacts)
        {
            this.TotalCount = totalCount;
            this.Contacts = contacts;
        }

        public int TotalCount { get; set; }

        public List<MyContactDto> Contacts { get; set; }
    }
}
