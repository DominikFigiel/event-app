using System.Threading.Tasks;
using EventApp.API.Models;

namespace EventApp.API.Data
{
    public interface IAuthRepository
    {
         Task<User> RegisterAsync(User user, string password);
         Task<User> LoginAsync(string username, string password);
         Task<bool> UserExists(string username);
    }
}