namespace Momentuum.Server.Models.DTOs
{
    public class UpdateTaskRequest
    {
        public long TaskId { get; set; }
        public required string Title { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? CompletedAt { get; set; }
        public bool IsCompleted { get; set; } = false;
        public bool IsArchived { get; set; } = false;
        public TaskPriority Priority { get; set; } = TaskPriority.Medium;
        public TaskStatus Status { get; set; } = TaskStatus.Pending;
    }
}
