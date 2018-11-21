using System;

namespace EventApp.API.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public Event Event { get; set; }
        public int EventId { get; set; }

    }
}