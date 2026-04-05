using System.Text.Json.Serialization;

namespace Momentuum.Server.Models
{
    public class HabitLog
    {
        public long HabitLogId {get;set;}
        public long HabitId {get;set;} // FK
        public DateTime CompletedAt {get;set;}
        
        [JsonIgnore]
        public Habit habit {get;set;}
    }

}
