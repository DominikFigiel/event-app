using System;
using EventApp.API.Models;

namespace EventApp.API.Dtos.Event
{
    public class EventForListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public Models.Venue Venue { get; set; }
        public DateTime Date { get; set; }
        public DateTime Created { get; set; }
        public string PhotoURL { get; set; }
        public bool Finished { get; set; }
        public bool Approved { get; set; }
        public bool Rejected { get; set; }
        public bool Promoted { get; set; }
        public Subcategory Subcategory { get; set; }
    }
}
