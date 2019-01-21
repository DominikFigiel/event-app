using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventApp.API.Helpers;
using EventApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EventApp.API.Data
{
    public class AppRepository : IAppRepository
    {
        private readonly DataContext _context;
        public AppRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(u => u.Orders).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public User GetUserByUsername(string username)
        {
            username = username.ToLower();
            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            return user;
        }

        public List<Role> GetUserRoles(int userId)
        {
            var userRoles = _context.Roles.Include(r => r.UserRoles).Where(r => r.UserRoles.Any(ur => ur.UserId == userId)).ToList();

            return userRoles;
        }

        public async Task<PagedList<Event>> GetEvents(EventParams eventParams)
        {
            var events = _context.Events
                .Include(e => e.Venue)
                    .Where(e => e.Approved == true && e.Date > DateTime.Now)
                        .OrderByDescending(e => e.Created).AsQueryable();

            if (!string.IsNullOrEmpty(eventParams.OrderBy))
            {
                switch (eventParams.OrderBy)
                {
                    case "date":
                        events = events.OrderBy(e => e.Date);
                        break;
                    default:
                        events = events.OrderByDescending(e => e.Created);
                        break;

                }
            }

            return await PagedList<Event>.CreateAsync(events, eventParams.PageNumber, eventParams.PageSize);
        }

        public async Task<Event> GetEvent(int id)
        {
            var ev = await _context.Events
                .Include(e => e.User)
                .Include(e => e.Images)
                .Include(e => e.Venue)
                .Include(e => e.Subcategory)
                    .ThenInclude(sc => sc.Category).FirstOrDefaultAsync(u => u.Id == id);

            return ev;
        }

        public Category GetCategory(int id)
        {
            var category = _context.Categories.FirstOrDefault(u => u.Id == id);

            return category;
        }

        public async Task<Category> AddCategoryAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            return category;
        }

        public async Task<bool> CategoryExists(string name)
        {
            if(await _context.Categories.AnyAsync(x => x.Name == name))
                return true;

            return false;
        }

        public Subcategory GetSubcategory(int id)
        {
            var subcategory = _context.Subcategories.FirstOrDefault(u => u.Id == id);

            return subcategory;
        }

        public async Task<Subcategory> AddSubcategoryAsync(Subcategory subcategory)
        {
            await _context.Subcategories.AddAsync(subcategory);
            await _context.SaveChangesAsync();

            return subcategory;
        }

        public async Task<bool> SubcategoryExists(string name)
        {
            if(await _context.Subcategories.AnyAsync(x => x.Name == name))
                return true;

            return false;
        }

        public City GetCity(int id)
        {
            var city = _context.Cities.FirstOrDefault(c => c.Id == id);

            return city;
        }

        public async Task<City> AddCityAsync(City city)
        {
            await _context.Cities.AddAsync(city);
            await _context.SaveChangesAsync();

            return city;
        }

        public async Task<bool> CityExists(string name)
        {
            if(await _context.Cities.AnyAsync(c => c.Name == name))
                return true;

            return false;
        }

        public Venue GetVenue(int id)
        {
            var venue = _context.Venues
            .Include(v => v.Address)
                .ThenInclude(a => a.City)
            .Include(v => v.Address)
            .FirstOrDefault(c => c.Id == id);

            return venue;
        }

        public async Task<Venue> AddVenueAsync(Venue venue)
        {
            await _context.Venues.AddAsync(venue);
            await _context.SaveChangesAsync();

            return venue;
        }

        public Address GetAddress(int id)
        {
            var address = _context.Addresses
            .Include(a => a.City)
            .FirstOrDefault(a => a.Id == id);

            return address;
        }

        // public ZipCode GetZipCode(int id)
        // {
        //     var zipcode = _context.ZipCodes
        //     .FirstOrDefault(a => a.Id == id);

        //     return zipcode;
        // }

        // public async Task<bool> ZipCodeExists(string code)
        // {
        //     if(await _context.ZipCodes.AnyAsync(c => c.Code == code))
        //         return true;

        //     return false;
        // }
        public async Task<List<Event>> GetEventsByPromoter(int promoterId)
        {
            var events = await _context.Events
                .Include(e => e.Venue)
                .Include(e => e.Subcategory)
                .Include(e => e.TicketCategories)
                    .Where(e => e.Date > DateTime.Now && e.UserId == promoterId && e.Rejected == false)
                        .OrderByDescending(e => e.Created).ToListAsync();

            return events;
        }

        public async Task<List<Event>> GetEndedEventsByPromoter(int promoterId)
        {
            var events = await _context.Events
                .Include(e => e.Venue)
                .Include(e => e.Subcategory)
                .Include(e => e.TicketCategories)
                    .Where(e => e.Date < DateTime.Now || e.Rejected == true && e.UserId == promoterId)
                        .OrderByDescending(e => e.Created).ToListAsync();

            return events;
        }

        public async Task<Event> AddEventAsync(Event ev)
        {
            await _context.Events.AddAsync(ev);
            await _context.SaveChangesAsync();

            return ev;
        }

        public async Task<List<TicketCategory>> GetEventTicketCategories(int eventId)
        {
            var ticketCategories = await _context.TicketCategories.Include(tc => tc.Event)
                    .Where(tc => tc.EventId == eventId)
                        .ToListAsync();

            return ticketCategories;
        }

        public async Task<TicketCategory> AddTicketCategoryAsync(TicketCategory ticketCategory)
        {
            await _context.TicketCategories.AddAsync(ticketCategory);
            await _context.SaveChangesAsync();

            return ticketCategory;
        }

        public async Task<List<Event>> GetFinishedEventsToCheck()
        {
            var events = await _context.Events
                .Include(e => e.Venue)
                .Include(e => e.Subcategory)
                .Include(e => e.TicketCategories)
                    .Where(e => e.Finished == true && e.Approved == false && e.Rejected == false)
                        .OrderByDescending(e => e.Created).ToListAsync();

            return events;
        }

        public async Task<List<Order>> GetOrdersByUser(int userId)
        {
            var orders = await _context.Orders
                .Include(o => o.Status)
                .Include(o => o.User)
                    .Where(o => o.UserId == userId)
                        .OrderByDescending(o => o.OrderDate).ToListAsync();

            return orders;
        }

        public async Task<List<Order>> GetUnpaidOrdersByUser(int userId)
        {
            var orders = await _context.Orders
                .Include(o => o.Status)
                .Include(o => o.User)
                    .Where(o => o.UserId == userId && o.Status.Name.Equals("Unpaid"))
                        .OrderByDescending(o => o.OrderDate).ToListAsync();

            return orders;
        }

        public async Task<Order> AddOrderAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            return order;
        }

        public async Task<OrderTicket> AddOrderTicketAsync(OrderTicket orderTicket)
        {
            await _context.OrderTickets.AddAsync(orderTicket);
            await _context.SaveChangesAsync();

            return orderTicket;
        }

        public async Task<Order> GetOrder(int orderId)
        {
            var order = await _context.Orders
                .FirstOrDefaultAsync(o => o.Id == orderId);

            return order;
        }

        public async Task<TicketCategory> GetTicketCategory(int ticketCategoryId)
        {
            var ticketCategory = await _context.TicketCategories
                .FirstOrDefaultAsync(tc => tc.Id == ticketCategoryId);

            return ticketCategory;
        }

        public async Task<List<OrderTicket>> GetOrderTickets(int orderId)
        {
            var orderTickets = await _context.OrderTickets
                .Include(o => o.Order)
                .Include(o => o.TicketCategory)
                .ThenInclude(tc => tc.Event)
                    .Where(o => o.OrderId == orderId)
                        .OrderByDescending(o => o.Order.OrderDate).ToListAsync();

            return orderTickets;
        }

        public async Task<List<Event>> GetEventsByCategory(int categoryId)
        {
            var events = await _context.Events
                .Include(e => e.Venue)
                .Include(e => e.Subcategory)
                .Include(e => e.TicketCategories)
                    .Where(e => e.Approved == true && e.Date > DateTime.Now && e.Subcategory.CategoryId == categoryId && e.Rejected == false)
                        .OrderByDescending(e => e.Created).ToListAsync();

            return events;
        }

        public async Task<List<Event>> GetEventsBySubcategory(int subcategoryId)
        {
            var events = await _context.Events
                .Include(e => e.Venue)
                .Include(e => e.Subcategory)
                .Include(e => e.TicketCategories)
                    .Where(e => e.Approved == true && e.Date > DateTime.Now && e.SubcategoryId == subcategoryId && e.Rejected == false)
                        .OrderByDescending(e => e.Created).ToListAsync();

            return events;
        }

        public async Task<List<Event>> GetEventsByCity(int cityId)
        {
            var events = await _context.Events
                .Include(e => e.Venue)
                .Include(e => e.Subcategory)
                .Include(e => e.TicketCategories)
                    .Where(e => e.Approved == true && e.Date > DateTime.Now && e.Venue.Address.CityId == cityId && e.Rejected == false)
                        .OrderByDescending(e => e.Created).ToListAsync();

            return events;
        }
        
    }
}