using System.ComponentModel.DataAnnotations;

namespace EventApp.API.Dtos.User
{
    public class UserForLoginDto
    {
        [Required(ErrorMessage = "Pole 'Login' jest wymagane.")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Pole 'Hasło' jest wymagane.")]
        public string Password { get; set; }
    }
}