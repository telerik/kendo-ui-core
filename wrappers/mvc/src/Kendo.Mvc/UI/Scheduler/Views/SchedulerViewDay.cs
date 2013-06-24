namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class SchedulerViewDay : SchedulerViewMultiDay
    {
        public SchedulerViewDay() 
        {
            this.Type = SchedulerViewType.Day;

            this.AllDaySlot = true;
        }
    }
}
