using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EventApp.API.Data;
using EventApp.API.Dtos.Event;
using EventApp.API.Dtos.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IAppRepository _repo;
        private readonly IMapper _mapper;
        public EventsController(IAppRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var events = await _repo.GetEvents();

            var eventsToReturn = _mapper.Map<IEnumerable<EventForListDto>>(events);

            return Ok(eventsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(int id)
        {
            var ev = await _repo.GetEvent(id);

            var evToReturn = _mapper.Map<EventForDetailedDto>(ev);

            return Ok(evToReturn);
        }


    } 
}