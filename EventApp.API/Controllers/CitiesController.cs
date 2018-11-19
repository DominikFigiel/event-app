using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventApp.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventApp.API.Controllers
{
    // http://localhost:5000/api/cities
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly DataContext _context;

        public CitiesController(DataContext context)
        {
            _context = context;
        }

        // GET api/cities
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await _context.Cities.ToListAsync();

            return Ok(cities);
        }

        // GET api/cities/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCity(int id)
        {
            var city = await _context.Cities.FirstOrDefaultAsync(c => c.Id == id);

            return Ok(city);
        }

        // POST api/cities
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/cities/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/cities/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}