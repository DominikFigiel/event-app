using System;
using System.Collections.Generic;

namespace EventApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhotoURL { get; set; }
        public DateTime RegistrationDate { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Event> Events { get; set; }
    }
}