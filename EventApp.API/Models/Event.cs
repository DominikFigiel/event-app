using System;

namespace EventApp.API.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int VenueId { get; set; }
        public Venue Venue { get; set; }
        public DateTime Date { get; set; }
        public bool Approved { get; set; }
    }
}