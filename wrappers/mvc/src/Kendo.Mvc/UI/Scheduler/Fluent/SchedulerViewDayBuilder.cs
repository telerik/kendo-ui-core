namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using System.Collections;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewDay"/>.
    /// </summary>
    public class SchedulerViewDayBuilder<T> : SchedulerViewMultiDayBuilder<T>
        where T : SchedulerViewDay
    {
        public SchedulerViewDayBuilder(T resource)
            : base(resource)
        { 
        }
    }
}
