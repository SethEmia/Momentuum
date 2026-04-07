namespace Momentuum.Server.Models.DTOs{
    public class CreateHabitLogRequest{
        public long HabitId { get; set; }
        public DateTime LogDate { get; set; }
        public bool IsCompleted { get; set; }
    }
}