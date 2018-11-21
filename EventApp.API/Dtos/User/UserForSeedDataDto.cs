using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using EventApp.API.Models;

namespace EventApp.API.Dtos.User
{
    public class UserForSeedDataDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhotoURL { get; set; }
        public DateTime RegistrationDate { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Event> Events { get; set; }
    }
}