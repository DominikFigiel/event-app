using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EventApp.API.Data;
using EventApp.API.Dtos.Event;
using EventApp.API.Dtos.User;
using EventApp.API.Helpers;
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
        public async Task<IActionResult> GetEvents([FromQuery]EventParams eventParams)
        {
            var events = await _repo.GetEvents(eventParams);

            var eventsToReturn = _mapper.Map<IEnumerable<EventForListDto>>(events);

            Response.AddPagination(events.CurrentPage, events.PageSize, events.TotalCount, events.TotalPages);

            return Ok(eventsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(int id)
        {
            var ev = await _repo.GetEvent(id);

            var evToReturn = _mapper.Map<EventForDetailedDto>(ev);

            return Ok(evToReturn);
        }

        [HttpGet("eventsByPromoter/{promoterId}")]
        public async Task<IActionResult> GetEventsByPromoter(int promoterId)
        {
            var events = await _repo.GetEventsByPromoter(promoterId);
            
            return Ok(events);
        }

        [HttpGet("endedEventsByPromoter/{promoterId}")]
        public async Task<IActionResult> GetEndedEventsByPromoter(int promoterId)
        {
            var events = await _repo.GetEndedEventsByPromoter(promoterId);
            
            return Ok(events);
        }

        [HttpGet("eventTicketCategories/{eventId}")]
        public async Task<IActionResult> GetEventTicketCategories(int eventId)
        {
            var events = await _repo.GetEventTicketCategories(eventId);
            
            return Ok(events);
        }


    } 
}