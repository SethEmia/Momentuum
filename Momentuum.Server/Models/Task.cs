using System.Text.Json.Serialization;

namespace Momentuum.Server.Models
{
    public class Task
    {
        public long TaskId { get; set; }
        public long UserId { get; set; } //FK

        [JsonIgnore]
        public User user { get; set; }
        public required string Title { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }
        public DateTime? CompletedAt { get; set; }
        public bool IsCompleted { get; set; } = false;
        public bool isArchived { get; set; } = false;
        public TaskStatus Status { get; set; } = TaskStatus.Pending;
        public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    }

    public enum TaskStatus
    {
        Pending,
        Completed,
    }
    public enum TaskPriority
    {
        Low,
        Medium,
        High
    }
}
