namespace EventApp.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int StatusId { get; set; }
        public Status Status { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}