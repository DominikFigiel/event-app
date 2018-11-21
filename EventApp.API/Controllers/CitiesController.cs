using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using EventApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventApp.API.Controllers
{
    // http://localhost:5000/api/cities
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IHostingEnvironment _host;
        private readonly string[] ACCEPTED_FILE_TYPES = new[] {".jpg", ".jpeg", ".png"};

        public CitiesController(DataContext context, IHostingEnvironment host)
        {
            _context = context;
            _host = host;
        }

        // GET api/cities
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await _context.Cities.ToListAsync();

            return Ok(cities);
        }

        // GET api/cities/5
        [AllowAnonymous]
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

        [AllowAnonymous]
        [HttpPost("upload"), DisableRequestSizeLimit]
        public IActionResult UploadFile(IFormFile filesData)
        {   
            try  
            {  
                foreach(var file in Request.Form.Files) {
                    // var file = Request.Form.Files[0];  
                    string folderName = "Upload";  
                    string webRootPath = _host.WebRootPath;  
                    string newPath = Path.Combine(webRootPath, folderName);  
                    if (!Directory.Exists(newPath))  
                    {  
                        Directory.CreateDirectory(newPath);  
                    }  
                    if (file.Length > 0)  
                    {  
                        string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');  
                        string fullPath = Path.Combine(newPath, fileName);  
                        using (var stream = new FileStream(fullPath, FileMode.Create))  
                        {  
                            file.CopyTo(stream);  
                        }  
                    }  
                }
                return Ok(); 
                
            }  
            catch (System.Exception ex)  
            {  
                return Ok("Upload Failed: " + ex.Message);  
            }  
        }

        // public IActionResult UploadFile(IFormFile filesData)
        // {   
        //     try  
        //     {  
        //         var file = Request.Form.Files[0];  
        //         string folderName = "Upload";  
        //         string webRootPath = _host.WebRootPath;  
        //         string newPath = Path.Combine(webRootPath, folderName);  
        //         if (!Directory.Exists(newPath))  
        //         {  
        //             Directory.CreateDirectory(newPath);  
        //         }  
        //         if (file.Length > 0)  
        //         {  
        //             string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');  
        //             string fullPath = Path.Combine(newPath, fileName);  
        //             using (var stream = new FileStream(fullPath, FileMode.Create))  
        //             {  
        //                 file.CopyTo(stream);  
        //             }  
        //         }  
        //         return Ok();  
        //     }  
        //     catch (System.Exception ex)  
        //     {  
        //         return Ok("Upload Failed: " + ex.Message);  
        //     }  
        // }

    }
}