using System.ComponentModel.DataAnnotations;

namespace EventApp.API.Dtos.User
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage = "Pole 'Login' jest wymagane ")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Pole 'Hasło' jest wymagane ")]
        [StringLength(40, MinimumLength = 6, ErrorMessage = "Hasło musi zawierać od 6 do 40 znaków ")]
        [RegularExpression(@"^(?=.*[A-Z]).{6,40}$",ErrorMessage="Hasło musi zawierać przynajmniej jedną wielką literę.")]
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

    }
}