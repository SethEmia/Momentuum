using Momentuum.Server.Models;

namespace Momentuum.Server.UserContexts
{
    public interface IUserContext
    {
        long UserId { get; }
        Task<User> GetUserAsync();
    }
}
