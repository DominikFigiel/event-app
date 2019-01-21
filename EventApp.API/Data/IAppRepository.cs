using System.Collections.Generic;
using System.Threading.Tasks;
using EventApp.API.Helpers;
using EventApp.API.Models;

namespace EventApp.API.Data
{
    public interface IAppRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
        User GetUserByUsername(string username);
        List<Role> GetUserRoles(int userId);
        Task<PagedList<Event>> GetEvents(EventParams eventParams);
        Task<Event> GetEvent(int id);
        Category GetCategory(int id);
        Task<Category> AddCategoryAsync(Category category);
        Task<bool> CategoryExists(string name);
        Subcategory GetSubcategory(int id);
        Task<Subcategory> AddSubcategoryAsync(Subcategory subcategory);
        Task<bool> SubcategoryExists(string name);
        City GetCity(int id);
        Task<City> AddCityAsync(City city);
        Task<bool> CityExists(string name);
        Venue GetVenue(int id);
        Task<Venue> AddVenueAsync(Venue venue);
        Address GetAddress(int id);
        // ZipCode GetZipCode(int id);
        // Task<bool> ZipCodeExists(string code);
        Task<List<Event>> GetEventsByPromoter(int promoterId);
        Task<List<Event>> GetEndedEventsByPromoter(int promoterId);
        Task<Event> AddEventAsync(Event ev);
        Task<List<TicketCategory>> GetEventTicketCategories(int eventId);
        Task<TicketCategory> AddTicketCategoryAsync(TicketCategory ticketCategory);
        Task<List<Event>> GetFinishedEventsToCheck();
        Task<List<Order>> GetOrdersByUser(int userId);
        Task<List<Order>> GetUnpaidOrdersByUser(int userId);
        Task<Order> AddOrderAsync(Order order);
        Task<OrderTicket> AddOrderTicketAsync(OrderTicket orderTicket);
        Task<Order> GetOrder(int orderId);
        Task<TicketCategory> GetTicketCategory(int ticketCategoryId);
        Task<List<OrderTicket>> GetOrderTickets(int orderId);
        Task<List<Event>> GetEventsByCategory(int categoryId);
        Task<List<Event>> GetEventsBySubcategory(int subcategoryId);
    }
}