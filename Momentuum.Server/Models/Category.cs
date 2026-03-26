using System.Text.Json.Serialization;

namespace Momentuum.Server.Models
{
    public class Category
    {
        public long CategoryId { get; set; }
        public long UserId { get; set; } //FK

        [JsonIgnore]
        public required string CategoryName { get; set; }
        public string ColorHex { get; set; } = "#FFFFFF"; // Default to white
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        public required User user { get; set; }
        public ICollection<Habit> Habits { get; set; } = new List<Habit>();
        public ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}
