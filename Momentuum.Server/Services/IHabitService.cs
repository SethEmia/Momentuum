
namespace Momentuum.Server.Services{
    public interface IHabitService{
        Habit<IEnumerable<Habit>> GetAllAsync();
        Habit<Habit> GetByIdAsync(long id);
        Habit<Habit> CreateAsync(CreateHabitRequest request);
        
        Habit<Habit> UpdateAsync(long id, UpdateHabitRequest request);
        Habit<bool> DeleteAsync(long id);
    }
}
