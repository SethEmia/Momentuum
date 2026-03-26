using System.Text.Json.Serialization;

namespace Momentuum.Server.Models
{
    public class Habit
    {
        public long HabitId { get; set; }
        public long UserId { get; set; } //FK
        
        [JsonIgnore]
        public User user { get; set; }
        public required string HabitName { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public required HabitFrequency Frequency { get; set; } = HabitFrequency.Daily;
        public bool isArchived { get; set; } = false;
    }

    public enum HabitFrequency
    {
        Daily,
        Weekly,
        Monthly
    }
}
