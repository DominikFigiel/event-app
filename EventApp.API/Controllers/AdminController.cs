using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using EventApp.API.Data;
using EventApp.API.Models;
using EventApp.API.Dtos;
using EventApp.API.Dtos.Role;
using Microsoft.AspNetCore.Authorization;
using EventApp.API.Dtos.Category;
using AutoMapper;

namespace EventApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        public readonly IAppRepository _repo;
        private readonly IMapper _mapper;

        public AdminController(DataContext context, IAppRepository repo, IMapper mapper)
        {
            _context = context;
            _repo = repo;
            _mapper = mapper;
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
                    await _context.UserRoles.AddAsync(ur);
                    await _context.SaveChangesAsync();
                    
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

        [HttpPost("addCategory")]
        public async Task<IActionResult> AddCategory(CategoryForAddDto categoryForAddDto)
        {

            if(await _repo.CategoryExists(categoryForAddDto.Name))
                return BadRequest("Kategoria o takiej nazwie już istnieje.");

            var categoryToCreate = _mapper.Map<Category>(categoryForAddDto);

            var createdCategory = await _repo.AddCategoryAsync(categoryToCreate);

            return NoContent();
        }

        [HttpPut("editCategory/{id}")]
        public async Task<IActionResult> EditCategory(int id, CategoryForUpdateDto catForUpdateDto)
        {
            var category = _repo.GetCategory(id);

            _mapper.Map(catForUpdateDto, category);

            if(await _repo.SaveAll())
                return NoContent();

            throw new System.Exception($"Updating user {id} failed on save");
        }

    }
}