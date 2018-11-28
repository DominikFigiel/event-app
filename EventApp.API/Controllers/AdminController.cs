using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using EventApp.API.Data;
using EventApp.API.Models;
using EventApp.API.Dtos;
using EventApp.API.Dtos.Role;

namespace EventApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        public IAppRepository _repo { get; }

        public AdminController(DataContext context, IAppRepository repo)
        {
            _context = context;
            _repo = repo;
        }

        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await (from user in _context.Users orderby user.Username
                select new
                {
                    Id = user.Id,
                    Username = user.Username,
                    Roles = (from studentRole in user.UserRoles
                                join role in _context.Roles
                                on studentRole.RoleId
                                equals role.Id
                                select role.Name).ToList()
                }).ToListAsync();

            return Ok(userList);
        }

        [HttpPost("editRoles/{username}")]
        public async Task<IActionResult> EditRoles(string username, RoleEditDto roleEditDto)
        {
            var user = _repo.GetUserByUsername(username);

            var userRoles = _repo.GetUserRoles(user.Id);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string [] {};

            foreach(var role in selectedRoles)
            {
                var r = _context.Roles.FirstOrDefault(x => x.Name == role);

                var check = _context.UserRoles.FirstOrDefault(x => x.UserId == user.Id && x.RoleId == r.Id);

                if(check == null)
                {
                    var ur = new UserRole { User = user, Role = r };
                    _context.UserRoles.AddAsync(ur).Wait();
                    _context.SaveChangesAsync().Wait();
                    

                    // return Ok(selectedRoles);
                }
                
            }

            foreach(var role in userRoles)
            {
                var r = _context.Roles.FirstOrDefault(x => x.Name == role.Name);

                var check = _context.UserRoles.FirstOrDefault(x => x.UserId == user.Id && x.RoleId == r.Id);

                if(check != null && !selectedRoles.Contains(role.Name))
                {
                    _context.UserRoles.Remove(check);
                    _context.SaveChangesAsync().Wait();
                    

                    // return Ok(selectedRoles);
                }
                
            }

            return Ok(selectedRoles);
            //return BadRequest("User already has that roles.");
        }

    }
}