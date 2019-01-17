namespace EventApp.API.Models
{
    public class Address
    {
        public int Id { get; set; }
        public int CityId { get; set; }
        public City City { get; set; }
        // public int ZipCodeId { get; set; }
        // public ZipCode ZipCode { get; set; }
        public string Line1 { get; set; }
        public string Line2 { get; set; }

    }
}