namespace EventApp.API.Models
{
    // Obiekt, Miejsce wydarzeń
    public class Venue
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
    }
}