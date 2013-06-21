using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KendoCRUDService.Models.EF;

namespace KendoCRUDService.Models
{
    public class MeetingViewModel
    {
        public int MeetingID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        private DateTime start;
        public DateTime Start
        {
            get
            {
                return start;
            }
            set
            {
                start = DateTime.SpecifyKind(value, DateTimeKind.Utc);
            }
        }

        private DateTime end;

        public DateTime End
        {
            get
            {
                return end;
            }
            set
            {
                end = DateTime.SpecifyKind(value, DateTimeKind.Utc);
            }
        }
        public string RecurrenceRule { get; set; }
        public int? RecurrenceID { get; set; }
        public string RecurrenceException { get; set; }
        public bool IsAllDay { get; set; }
        public string Timezone { get; set; }
        public int? RoomID { get; set; }
        public IEnumerable<int> Atendees { get; set; }

        public Meeting ToEntity()
        {
            return new Meeting
            {
                MeetingID = MeetingID,
                Title = Title,
                Start = Start,
                End = End,
                Description = Description,
                IsAllDay = IsAllDay,
                RecurrenceRule = RecurrenceRule,
                RecurrenceException = RecurrenceException,
                RecurrenceID = RecurrenceID,
                RoomID = RoomID
            };
        }
    }
}