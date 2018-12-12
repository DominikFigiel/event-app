using EventApp.API.Models;

namespace EventApp.API.Dtos.Address
{
    public class AddressForUpdateDto
    {
        public int Id { get; set; }
        public int CityId { get; set; }
        public int ZipCodeId { get; set; }
        public string Line1 { get; set; }
        public string Line2 { get; set; }
    }
}