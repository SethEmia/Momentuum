namespace Momentuum.Server.Models.DTOs{
    public class CreateHabitRequest{
        public required string HabitName { get; set; }
        public string? Description { get; set; }
        public HabitFrequency Frequency { get; set; } = HabitFrequency.Daily;
    }
}