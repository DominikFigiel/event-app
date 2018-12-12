using EventApp.API.Models;

namespace EventApp.API.Dtos.Venue
{
    public class VenueForAddDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public int AddressId { get; set; }
        public Models.Address Address { get; set; }
    }
}