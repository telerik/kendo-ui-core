namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using System.Collections;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewWeek"/>.
    /// </summary>
    public class SchedulerViewWeekBuilder<T> : SchedulerViewMultiDayBuilder<T>
        where T : SchedulerViewWeek
    {
        public SchedulerViewWeekBuilder(T resource)
            : base(resource)
        { 
        }
    }
}
