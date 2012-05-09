namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    public class CalendarSelectionSettings : RequestSettings
    {
        public IList<DateTime> Dates 
        { 
            get; 
            set; 
        }
    }
}
