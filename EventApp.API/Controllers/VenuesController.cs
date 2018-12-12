using System.Threading.Tasks;
using EventApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventApp.API.Controllers
{    
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VenuesController : ControllerBase
    {
        private readonly DataContext _context;

        public VenuesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetVenues()
        {
            var venues = await _context.Venues
            .Include(v => v.Address)
            .ThenInclude(a => a.City)
            .Include(v => v.Address)
            .ThenInclude(a => a.ZipCode)
            .ToListAsync();

            return Ok(venues);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVenue(int id)
        {
            var venue = await _context.Venues.FirstOrDefaultAsync(v => v.Id == id);

            return Ok(venue);
        }
    }
}