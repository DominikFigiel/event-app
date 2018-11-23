
using System;
using System.Collections.Generic;
using EventApp.API.Models;

namespace EventApp.API.Dtos.User
{
    public class UserForUpdateDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; }
        public string PhotoURL { get; set; }
    }
}