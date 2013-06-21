namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class SchedulerViewWeek : SchedulerViewMultiDay
    {
        public SchedulerViewWeek()
        {
            this.Type = SchedulerViewType.Week;

            this.AllDaySlot = true;

            this.MajorTick = 60;
        }
    }
}
