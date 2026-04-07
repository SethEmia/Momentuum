using Momentuum.Server.Models;
using Momentuum .Server.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Momentuum.Server.Services{
    public interface IHabitLogService{
        Task<IEnumerable<HabitLog>> GetAllAsync();
        Task<HabitLog> GetByIdAsync(long id);
        Task<HabitLog> CreateAsync(CreateHabitLogRequest request);
        Task<bool> DeleteAsync(long id);
    }
}