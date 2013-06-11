using System;

namespace KendoCRUDService.Models
{
    public class EventModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Timezone { get; set; }
        public bool IsAllDay { get; set; }
        public string Description { get; set; }
    }
}