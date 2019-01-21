using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using EventApp.API.Data;
using EventApp.API.Dtos.User;
using EventApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAppRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IAppRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(users);
        }

        [HttpGet("{id}", Name= "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if(await _repo.SaveAll())
                return NoContent();

            throw new System.Exception($"Updating user {id} failed on save");
        }

        [HttpGet("ordersByUser/{userId}")]
        public async Task<IActionResult> GetOrdersByUser(int userId)
        {
            var orders = await _repo.GetOrdersByUser(userId);
            
            return Ok(orders);
        }

        [HttpGet("unpaidOrdersByUser/{userId}")]
        public async Task<IActionResult> GetUnpaidOrdersByUser(int userId)
        {
            var orders = await _repo.GetUnpaidOrdersByUser(userId);
            
            return Ok(orders);
        }

        [HttpPost("addOrder/{userId}")]
        public async Task<IActionResult> AddOrder(int userId)
        {
            var order = new Order{StatusId = 1, UserId = userId, TotalAmount = 0, OrderDate = DateTime.Now};

            var createdOrder = await _repo.AddOrderAsync(order);

            return Ok(createdOrder.Id);
        }

        [HttpPost("addOrderTicket/{createdOrderId}/{ticketCatId}/{soldUnits}")]
        public async Task<IActionResult> AddOrder(int createdOrderId, int ticketCatId, int soldUnits)
        {
            var orderTicket = new OrderTicket{OrderId = createdOrderId, TicketCategoryId = ticketCatId, SoldUnits = soldUnits};

            var createdOrderTicket = await _repo.AddOrderTicketAsync(orderTicket);

            var ticketCategory = await _repo.GetTicketCategory(ticketCatId);
            ticketCategory.SoldUnits += soldUnits;

            await _repo.SaveAll();

            return Ok(createdOrderTicket.Id);
        }

        [HttpPut("updateOrderTotalAmount/{createdOrderId}/{orderTotalAmount}")]
        public async Task<IActionResult> UpdateOrderTotalAmount(int createdOrderId, decimal orderTotalAmount)
        {
            var orderFromRepo = await _repo.GetOrder(createdOrderId);

            orderFromRepo.TotalAmount = orderTotalAmount;

            if(await _repo.SaveAll())
                return Ok(orderTotalAmount);

            throw new System.Exception($"Updating order {createdOrderId} failed on save");
        }

        [HttpPut("successfulPayment/{orderId}")]
        public async Task<IActionResult> SuccessfulPayment(int orderId)
        {
            var orderFromRepo = await _repo.GetOrder(orderId);

            orderFromRepo.PaymentDate = DateTime.Now;
            orderFromRepo.StatusId = 2;

            if(await _repo.SaveAll())
                return Ok(orderFromRepo.PaymentDate);

            throw new System.Exception($"Updating order {orderId} failed on save");
        }

    } 
}