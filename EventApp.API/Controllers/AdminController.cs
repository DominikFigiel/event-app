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
using EventApp.API.Dtos.City;
using EventApp.API.Dtos.Venue;
using EventApp.API.Dtos.Address;
using EventApp.API.Dtos.Event;

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

        [HttpDelete("deleteCategory/{id}")]
        public async Task<IActionResult> DeleteCategory(int? id)
        {

            if (id == null)
            {
                return NotFound();
            }

            var category = await _context.Categories
                .FirstOrDefaultAsync(m => m.Id == id);
            if (category == null)
            {
                return NotFound();
            } else {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
                return NoContent();
            }
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

        [HttpPost("addSubcategory")]
        public async Task<IActionResult> AddSubcategory(SubcategoryForAddDto subcategoryForAddDto)
        {

            if(await _repo.SubcategoryExists(subcategoryForAddDto.Name))
                return BadRequest("Podkategoria o takiej nazwie już istnieje.");

            var subcategoryToCreate = _mapper.Map<Subcategory>(subcategoryForAddDto);

            var createdSubcategory = await _repo.AddSubcategoryAsync(subcategoryToCreate);

            return NoContent();
        }

        [HttpDelete("deleteSubcategory/{id}")]
        public async Task<IActionResult> DeleteSubcategory(int? id)
        {

            if (id == null)
            {
                return NotFound();
            }

            var subcategory = await _context.Subcategories
                .FirstOrDefaultAsync(sc => sc.Id == id);
            if (subcategory == null)
            {
                return NotFound();
            } else {
                _context.Subcategories.Remove(subcategory);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }

        [HttpPut("editSubcategory/{id}")]
        public async Task<IActionResult> EditSubcategory(int id, SubcategoryForUpdateDto subcatForUpdateDto)
        {
            var subcategory = _repo.GetSubcategory(id);

            _mapper.Map(subcatForUpdateDto, subcategory);

            if(await _repo.SaveAll())
                return NoContent();

            throw new System.Exception($"Updating subcategory {id} failed on save");
        }

        [HttpPost("addCity")]
        public async Task<IActionResult> AddCity(CityForAddDto cityForAddDto)
        {

            if(await _repo.CityExists(cityForAddDto.Name))
                return BadRequest("Miasto o takiej nazwie już istnieje.");

            var cityToCreate = _mapper.Map<City>(cityForAddDto);

            var createdCity = await _repo.AddCityAsync(cityToCreate);

            return NoContent();
        }

        [HttpDelete("deleteCity/{id}")]
        public async Task<IActionResult> DeleteCity(int? id)
        {

            if (id == null)
            {
                return NotFound();
            }

            var city = await _context.Cities
                .FirstOrDefaultAsync(c => c.Id == id);
            if (city == null)
            {
                return NotFound();
            } else {
                _context.Cities.Remove(city);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }

        [HttpPut("editCity/{id}")]
        public async Task<IActionResult> EditCity(int id, CityForUpdateDto cityForUpdateDto)
        {
            var city = _repo.GetCity(id);

            _mapper.Map(cityForUpdateDto, city);

            if(await _repo.SaveAll())
                return NoContent();

            throw new System.Exception($"Updating city {id} failed on save");
        }

        [HttpPut("editVenue/{id}")]
        public async Task<IActionResult> EditVenue(int id, VenueForUpdateDto venueForUpdateDto)
        {
            var venue = _repo.GetVenue(id);

            _mapper.Map(venueForUpdateDto, venue);

            if(await _repo.SaveAll())
                return NoContent();

            throw new System.Exception($"Updating venue {id} failed on save");
        }

        [HttpDelete("deleteVenue/{id}")]
        public async Task<IActionResult> DeleteVenue(int? id)
        {

            if (id == null)
            {
                return NotFound();
            }

            var venue = await _context.Venues
                .FirstOrDefaultAsync(v => v.Id == id);
            if (venue == null)
            {
                return NotFound();
            } else {
                _context.Venues.Remove(venue);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }

        [HttpPut("editAddress/{id}")]
        public async Task<IActionResult> EditAddress(int id, AddressForUpdateDto addressForUpdateDto)
        {
            var address = _repo.GetAddress(id);

            _mapper.Map(addressForUpdateDto, address);

            if(await _repo.SaveAll())
                return NoContent();

            throw new System.Exception($"Updating address {id} failed on save");
        }

        // [HttpGet("getZipCode/{code}")]
        // public async Task<IActionResult> getZipCode(string code)
        // {
        //     var zipCode =  await _context.ZipCodes.FirstOrDefaultAsync(z => z.Code == code);

        //     return Ok(zipCode);
        // }

        [HttpPost("addEvent")]
        public async Task<IActionResult> AddEvent(EventForAddDto eventForAddDto)
        {
            var eventToCreate = _mapper.Map<Event>(eventForAddDto);

            var createdEvent = await _repo.AddEventAsync(eventToCreate);

            return NoContent();
        }

    }
}