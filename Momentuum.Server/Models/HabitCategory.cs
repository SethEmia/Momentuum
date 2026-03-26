namespace Momentuum.Server.Models
{
    public class HabitCategory
    {
        public long HabitId{ get; set; }
        public Habit Habit { get; set; } = null!;

        public long CategoryId { get; set; }
        public Category Category { get; set; } = null!;
    }
}
