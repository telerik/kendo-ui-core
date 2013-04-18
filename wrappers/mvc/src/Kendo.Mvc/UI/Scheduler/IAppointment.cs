using System;

namespace Kendo.Mvc.UI
{
    public interface IAppointment
    {
        Guid UID { get; }

        //content lines
        string Title { get; set; }
        string Description { get; set; }

        //duration
        bool AllDayEvent { get; set; }
        DateTime Start { get; set; }
        DateTime End { get; set; }
        TimeZoneInfo TimeZoneInfo { get; set; }

        //importance or color
        int Importance { get; set; }

        bool Transparent { get; set; }

        //recurrence
        //resources
    }
}
