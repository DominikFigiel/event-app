using System;
using System.ComponentModel.DataAnnotations;

namespace EventApp.API.Dtos.User
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage = "Pole 'Login' jest wymagane")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Pole 'Hasło' jest wymagane")]
        [StringLength(40, MinimumLength = 6, ErrorMessage = "Hasło musi zawierać od 6 do 40 znaków\n")]
        [RegularExpression(@"^(?=.*[A-Z]).{6,40}$", ErrorMessage="Hasło musi zawierać przynajmniej jedną wielką literę")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Pole 'Imię' jest wymagane")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Pole 'Nazwisko' jest wymagane")]
        public string Surname { get; set; }
        [Required(ErrorMessage = "Pole 'Email' jest wymagane")]
        public string Email { get; set; }
        public string PhotoURL { get; set; }
        public string CompanyName { get; set; }
        [Required(ErrorMessage = "Pole 'Data urodzenia' jest wymagane")]
        public DateTime DateOfBirth { get; set; }
        public DateTime RegistrationDate { get; set; }

        public UserForRegisterDto()
        {
            RegistrationDate = DateTime.Now;

            Random r = new Random();
            var randomPhotoNumber = r.Next(1, 100);

            PhotoURL = "https://randomuser.me/api/portraits/men/" + randomPhotoNumber + ".jpg";
        }

    }
}