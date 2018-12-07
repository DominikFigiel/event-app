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
    }
}