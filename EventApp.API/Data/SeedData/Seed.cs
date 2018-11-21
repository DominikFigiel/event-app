using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EventApp.API.Dtos.User;
using EventApp.API.Models;
using Newtonsoft.Json;

namespace EventApp.API.Data.SeedData
{
    public class Seed
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public Seed(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void SeedData()
        {
            // run only if table is empty
            if (_context.Users.Count() == 0) {
                var userData = System.IO.File.ReadAllText("Data/SeedData/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<UserForSeedDataDto>>(userData);
                foreach(var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash(user.Password, out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();

                    // TODO convert UserForSeedDataDto to User (AutoMapper)
                    var userToAdd = _mapper.Map<User>(user);

                    _context.Users.Add(userToAdd);
                }

                _context.SaveChanges();
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}