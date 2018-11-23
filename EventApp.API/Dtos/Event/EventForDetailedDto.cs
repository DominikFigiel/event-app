using System;
using EventApp.API.Models;

namespace EventApp.API.Dtos.Event
{
    public class EventForDetailedDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public Venue Venue { get; set; }
        public DateTime Date { get; set; }
        public DateTime Created { get; set; }
        public string PhotoURL { get; set; }
        public bool Approved { get; set; }
    }
}
