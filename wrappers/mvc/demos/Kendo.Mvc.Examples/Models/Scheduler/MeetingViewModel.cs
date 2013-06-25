namespace Kendo.Mvc.Examples.Models.Scheduler
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using Kendo.Mvc.UI;

    public class MeetingViewModel : ISchedulerEvent
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
                start = value.ToUniversalTime();
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
                end = value.ToUniversalTime();
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