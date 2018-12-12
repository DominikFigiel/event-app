using EventApp.API.Models;

namespace EventApp.API.Dtos.Venue
{
    public class VenueForUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public int AddressId { get; set; }
        // public Address Address { get; set; }
    }
}