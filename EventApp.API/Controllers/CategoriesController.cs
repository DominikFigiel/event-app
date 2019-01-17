using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using EventApp.API.Data;
using EventApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventApp.API.Controllers
{
    // http://localhost:5000/api/categories
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly DataContext _context;

        public CategoriesController(DataContext context, IHostingEnvironment host)
        {
            _context = context;
        }

        // GET api/categories
        [HttpGet]
        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = await _context.Categories.Include(c => c.Subcategories).ToListAsync();

            return categories;
        }

        [AllowAnonymous]
        [HttpGet("counter")]
        public async Task<int> GetCategoriesCount()
        {
            var categoriesCount = await _context.Categories.CountAsync();

            return categoriesCount;
        }

        // GET api/categories/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            return Ok(category);
        }

        [AllowAnonymous]
        [HttpGet("{id}/subcategories")]
        public async Task<IEnumerable<Subcategory>> GetSubcategories(int id)
        {
            var subcategories = await _context.Subcategories.Where(s => s.CategoryId == id).ToListAsync();

            return subcategories;
        }

        [HttpGet("allSubcategories")]
        public async Task<IEnumerable<Subcategory>> GetAllSubcategories()
        {
            var subcategories = await _context.Subcategories.Include(s => s.Category).ToListAsync();

            return subcategories;
        }

        // POST api/categories
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/categories/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/categories/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    }
}