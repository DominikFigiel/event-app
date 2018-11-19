using System.ComponentModel.DataAnnotations;

namespace EventApp.API.Dtos.User
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 16 characters")]
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

    }
}