using System;
using EventApp.API.Models;

namespace EventApp.API.Dtos.Image
{
    public class ImagesForDetailedDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
    }
}