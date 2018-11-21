using System;

namespace EventApp.API.Dtos.User
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhotoURL { get; set; }
        public DateTime RegistrationDate { get; set; }

    }
}