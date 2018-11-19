namespace EventApp.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int StatusId { get; set; }
        public Status Status { get; set; }
    }
}