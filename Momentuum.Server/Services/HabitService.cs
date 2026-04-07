using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Momentuum.Server.Models;
using Momentuum.Server.Data;
using Momentuum.Server.Models.DTOs;
using Momentuum.Server.UserContexts;

namespace Momentuum.Server.Services{
    public class HabitService : IHabitService{
        private readonly ApplicationDbContext _context;
        private readonly IUserContext _userContext;
        public HabitService(ApplicationDbContext context, IUserContext userContext){
            _context = context;
            _userContext = userContext;
        }
        public async Task<IEnumerable<Models.Habit>> GetAllAsync(){
            var userId = _userContext.UserId;
            var habits = await _context.Habits.Where(h => h.UserId == userId).ToListAsync();
            return habits;
        }
        public async Task<Models.Habit?> GetByIdAsync(long id){
            var userId = _userContext.UserId;
            var habit = await _context.Habits.FirstOrDefaultAsync(h => h.HabitId == id && h.UserId == userId);
            return habit;
        }
        public async Task<Models.Habit> CreateAsync(CreateHabitRequest request){
            var userId = _userContext.UserId;
            var habit = new Habit{
                UserId = userId,
                HabitName = request.HabitName,
                Description = request.Description,
                Frequency = request.Frequency,
                CreatedAt = DateTime.UtcNow,
                isArchived = false
            };
            _context.Habits.Add(habit);
            await _context.SaveChangesAsync();
            return habit;
        }
        public async Task<Models.Habit> UpdateAsync(long id, UpdateHabitRequest request){
            var userId = _userContext.UserId;
            var habit = await _context.Habits.FirstOrDefaultAsync(h => h.HabitId == id && h.UserId == userId);
            if(habit == null){
                return null;
            }
            habit.HabitName = request.HabitName;
            habit.Description = request.Description;
            habit.Frequency = request.Frequency;
            await _context.SaveChangesAsync();
            return habit;
        }
        public async Task<bool> DeleteAsync(long id){
            var userId = _userContext.UserId;
            var habit = await _context.Habits.FirstOrDefaultAsync(h => h.HabitId == id && h.UserId == userId);
            if(habit == null){
                return false;
            }
            habit.isArchived = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}