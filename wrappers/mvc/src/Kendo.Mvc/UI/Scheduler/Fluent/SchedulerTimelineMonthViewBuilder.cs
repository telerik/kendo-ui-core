namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerTimelineMonthView"/>.
    /// </summary>
    public class SchedulerTimelineMonthViewBuilder<TView> : SchedulerTimelineViewBuilderBase<TView, SchedulerTimelineMonthViewBuilder<TView>>
        where TView : SchedulerTimelineViewBase
    {
        public SchedulerTimelineMonthViewBuilder(TView resource)
            : base(resource)
        {
        }
    }
}
