using System;
using System.Collections.Generic;

namespace EventApp.API.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public int VenueId { get; set; }
        public Venue Venue { get; set; }
        public DateTime Date { get; set; }
        public DateTime Created { get; set; }
        public string PhotoURL { get; set; }
        public bool Approved { get; set; }
        public ICollection<Image> Images { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public Subcategory Subcategory { get; set; }
        public int SubcategoryId { get; set; }
        public ICollection<TicketCategory> TicketCategories { get; set; }
    }
}