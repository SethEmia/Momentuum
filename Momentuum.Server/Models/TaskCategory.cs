namespace Momentuum.Server.Models
{
    public class TaskCategory
    {
        public long TaskId { get; set; }
        public Task Task { get; set; } = null!;

        public long CategoryId { get; set; }
        public Category Category { get; set; } = null!;

    }
}
