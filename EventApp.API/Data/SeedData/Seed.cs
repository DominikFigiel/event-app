using System;
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
            this.SeedUserRoles();
            this.SeedUsers();
            this.SeedCities();
            // this.SeedZipCodes();
            this.SeedAddresses();
            this.SeedVenues();
            this.SeedCategories();
            this.SeedSubcategories();
            this.SeedEvents();
        }

        public void SeedUserRoles()
        {
            if (_context.Roles.Count() == 0) {
                var roles = new List<Role>
                {
                    new Role{Name = "Klient"},
                    new Role{Name = "Organizator"},
                    new Role{Name = "Administrator"}
                };

                foreach(var role in roles)
                {
                    _context.Roles.AddAsync(role).Wait();
                    _context.SaveChanges();
                }
            }
        }

        public void SeedUsers()
        {
            // run only if table is empty
            if (_context.Users.Count() == 0 && _context.Roles.FirstOrDefault(x => x.Name == "Klient") != null) {
                var userData = System.IO.File.ReadAllText("Data/SeedData/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<UserForSeedDataDto>>(userData);
                var role = _context.Roles.FirstOrDefault(x => x.Name == "Klient");
                var roleAdmin = _context.Roles.FirstOrDefault(x => x.Name == "Administrator");
                
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

                    var userRole = new UserRole { User = userToAdd, Role = role };

                    _context.UserRoles.AddAsync(userRole).Wait();

                    // Role: Admin
                    if(user.Username == "dominik" && _context.Roles.FirstOrDefault(x => x.Name == "Administrator") != null)
                    {
                        var userRoleAdmin = new UserRole { User = userToAdd, Role = roleAdmin };
                        _context.UserRoles.AddAsync(userRoleAdmin).Wait();
                    }
                }

                _context.SaveChanges();
            }
        }

        public void SeedCities()
        {
            // run only if table is empty
            if (_context.Cities.Count() == 0) {
                var data = System.IO.File.ReadAllText("Data/SeedData/CitySeedData.json");
                var objects = JsonConvert.DeserializeObject<List<City>>(data);
                foreach(var city in objects)
                {
                    _context.Cities.Add(city);
                }

                _context.SaveChanges();
            }
        }

        // public void SeedZipCodes()
        // {
        //     // run only if table is empty
        //     if (_context.ZipCodes.Count() == 0) {
        //         var data = System.IO.File.ReadAllText("Data/SeedData/ZipCodeSeedData.json");
        //         var objects = JsonConvert.DeserializeObject<List<ZipCode>>(data);
        //         foreach(var zipCode in objects)
        //         {
        //             _context.ZipCodes.Add(zipCode);
        //         }

        //         _context.SaveChanges();
        //     }
        // }

        public void SeedAddresses()
        {
            // run only if table is empty
            if (_context.Addresses.Count() == 0) {
                var data = System.IO.File.ReadAllText("Data/SeedData/AddressSeedData.json");
                var objects = JsonConvert.DeserializeObject<List<Address>>(data);
                foreach(var address in objects)
                {
                    _context.Addresses.Add(address);
                }

                _context.SaveChanges();
            }
        }

        public void SeedVenues()
        {
            // run only if table is empty
            if (_context.Venues.Count() == 0) {
                var data = System.IO.File.ReadAllText("Data/SeedData/VenueSeedData.json");
                var objects = JsonConvert.DeserializeObject<List<Venue>>(data);
                foreach(var venue in objects)
                {
                    _context.Venues.Add(venue);
                }

                _context.SaveChanges();
            }
        }

        public void SeedCategories()
        {
            // run only if table is empty
            if (_context.Categories.Count() == 0) {
                var data = System.IO.File.ReadAllText("Data/SeedData/CategorySeedData.json");
                var objects = JsonConvert.DeserializeObject<List<Category>>(data);
                foreach(var category in objects)
                {
                    _context.Categories.Add(category);
                }

                _context.SaveChanges();
            }
        }

        public void SeedSubcategories()
        {
            // run only if table is empty
            if (_context.Subcategories.Count() == 0) {
                var data = System.IO.File.ReadAllText("Data/SeedData/SubcategorySeedData.json");
                var objects = JsonConvert.DeserializeObject<List<Subcategory>>(data);
                foreach(var subcategory in objects)
                {
                    _context.Subcategories.Add(subcategory);
                }

                _context.SaveChanges();
            }
        }

        public void SeedEvents()
        {
            // run only if table is empty
            if (_context.Events.Count() == 0) {
                var data = System.IO.File.ReadAllText("Data/SeedData/EventSeedData.json");
                var objects = JsonConvert.DeserializeObject<List<Event>>(data);
                foreach(var ev in objects)
                {
                    ev.Created = DateTime.Now;

                    _context.Events.Add(ev);
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