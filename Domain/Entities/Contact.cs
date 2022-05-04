namespace Domain.Entities
{
    public class Contact
    {
        private Contact()
        {            
        }

        public Contact(
            string firstName,
            string surname,
            DateTimeOffset dateOfBirth,
            string address,
            string phoneNumber,
            string iban)
        {
            this.Id = Guid.NewGuid();
            this.FirstName = firstName;
            this.Surname = surname;
            this.DateOfBirth = dateOfBirth;
            this.Address = address;
            this.PhoneNumber = phoneNumber;
            this.IBAN = iban;
        }

        public Guid Id { get; private set; }
        public string FirstName { get; private set; }
        public string Surname { get; private set; }
        public string Address { get; private set; }
        public string PhoneNumber { get; private set; }
        public string IBAN { get; private set; }
        public DateTimeOffset DateOfBirth { get; private set; }

        public void Update(
            string firstName,
            string surname,
            string address,
            string phoneNumber,
            string iban,
            DateTimeOffset? dateOfBirth = null)
        {
            if (!string.IsNullOrWhiteSpace(firstName))
            {
                this.FirstName = firstName;
            }
            if (!string.IsNullOrWhiteSpace(surname))
            {
                this.Surname = surname;
            }
            if (!string.IsNullOrWhiteSpace(address))
            {
                this.Address = address;
            }
            if (!string.IsNullOrWhiteSpace(phoneNumber))
            {
                this.PhoneNumber = phoneNumber;
            }
            if (!string.IsNullOrWhiteSpace(iban))
            {
                this.IBAN = iban;
            }
            if (dateOfBirth != null)
            {
                this.DateOfBirth = dateOfBirth.Value;
            }
        }
    }
}
