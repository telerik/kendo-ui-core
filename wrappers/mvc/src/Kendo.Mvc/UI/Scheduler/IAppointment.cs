using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public interface IAppointment
    {
        Guid UID { get; }

        //content lines
        string Title { get; set; }
        string Description { get; set; }

        //duration
        DateTime Start { get; set; }
        DateTime End { get; set; }
        TimeZoneInfo TimeZoneInfo { get; set; }
        bool AllDayEvent { get; set; }

        //importance or color
        int Importance { get; set; }

        bool Transparent { get; set; }

        //recurrence
        //resources
    }
}
