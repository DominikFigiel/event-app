using System;
using EventApp.API.Models;

namespace EventApp.API.Dtos.Event
{
    public class EventForAddDto
    {
        public string Name { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public int VenueId { get; set; }
        public DateTime Date { get; set; }
        public int SubcategoryId { get; set; }
        public DateTime Created { get; set; }
        public bool Finished { get; set; }
        public bool Approved { get; set; }
        public string PhotoURL { get; set; }
        public int UserId { get; set; }

        public EventForAddDto()
        {
            Created = DateTime.Now;

            Random r = new Random();
            var randomPhotoNumber = r.Next(1, 100);

            PhotoURL = "https://randomuser.me/api/portraits/men/" + randomPhotoNumber + ".jpg";

            Finished = false;

            Approved = false;
        }
    }

}