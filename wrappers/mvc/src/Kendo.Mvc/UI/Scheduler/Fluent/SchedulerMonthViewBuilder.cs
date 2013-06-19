namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using System.Collections;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerMonthView"/>.
    /// </summary>
    public class SchedulerMonthViewBuilder : SchedulerViewBaseBuilder, ISchedulerViewBuilder
    {
        public SchedulerMonthViewBuilder(SchedulerMonthView resource)
            : base(resource)
        { 
        }
    }
}
