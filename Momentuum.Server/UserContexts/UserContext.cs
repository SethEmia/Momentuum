using Microsoft.AspNetCore.Identity;
using Momentuum.Server.Models;
using System.Security.Claims;

namespace Momentuum.Server.UserContexts
{
    public class UserContext : IUserContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public UserContext(IHttpContextAccessor httpContextAccessor, UserManager<User> userManager)
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }
        public long UserId
        {
            get
            {
                var userIdClaim = _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier);
                
                if (userIdClaim == null)
                {
                    throw new Exception("User is not authenticated.");
                }
                return long.Parse(userIdClaim);
            }
        }

        public async Task<User> GetUserAsync()
        {
            var user = await _userManager.FindByIdAsync(UserId.ToString());
            if (user == null)
            {
                throw new Exception("User not found.");
            }
            return user;
        }
    }
}
