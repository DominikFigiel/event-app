namespace EventApp.API.Models
{
    public class OrderTicket
    {
        public int Id { get; set; }
        public Order Order { get; set; }
        public int OrderId { get; set; }
        public TicketCategory TicketCategory { get; set; }
        public int TicketCategoryId { get; set; }
        public int SoldUnits { get; set; }
    }
}