using Momentuum.Server.Models;
using Momentuum .Server.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Momentuum.Server.Services{
    public interface IHabitService{
        Task<IEnumerable<Habit>> GetAllAsync();
        Task<Habit> GetByIdAsync(long id);
        Task<Habit> CreateAsync(CreateHabitRequest request);
        Task<Habit> UpdateAsync(long id, UpdateHabitRequest request);
        Task<bool> DeleteAsync(long id);
    }
}
