using System;

namespace Kendo.Mvc.UI
{
    public class Appointment : IAppointment
    {
        public Appointment()
        {
            UID = Guid.NewGuid();
        }

        public Guid UID { get; private set; }

        //content lines
        public string Title { get; set; }
        public string Description { get; set; }

        //duration
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public TimeZoneInfo TimeZoneInfo { get; set; }
        public bool AllDayEvent { get; set; }

        //importance or color
        public int Importance { get; set; }

        public bool Transparent { get; set; }        
    }
}
