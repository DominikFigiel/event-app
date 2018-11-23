using System.Collections.Generic;
using System.Threading.Tasks;
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

        public async Task<IEnumerable<Event>> GetEvents()
        {
            var events = await _context.Events.Include(e => e.Venue).ToListAsync();

            return events;
        }

        public async Task<Event> GetEvent(int id)
        {
            var ev = await _context.Events.Include(e => e.Images).Include(e => e.Venue).FirstOrDefaultAsync(u => u.Id == id);

            return ev;
        }
 
    }
}