namespace EventApp.API.Models
{
    public class TicketCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; } 
        public int Quantity { get; set; }
        public int SoldUnits { get; set; }
        public Event Event { get; set; }
        public int EventId { get; set; }
    }
}