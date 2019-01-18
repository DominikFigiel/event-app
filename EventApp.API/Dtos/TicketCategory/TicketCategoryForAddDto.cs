namespace EventApp.API.Dtos.TicketCategory
{
    public class TicketCategoryForAddDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int SoldUnits { get; set; }
        public int EventId { get; set; }

        public TicketCategoryForAddDto()
        {
            SoldUnits = 0;
        }
    }
}