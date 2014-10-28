namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerTimelineWeekView"/>.
    /// </summary>
    public class SchedulerTimelineWeekViewBuilder<TView> : SchedulerTimelineViewBuilderBase<TView, SchedulerTimelineWeekViewBuilder<TView>>
        where TView : SchedulerTimelineViewBase
    {
        public SchedulerTimelineWeekViewBuilder(TView resource)
            : base(resource)
        {
        }
    }
}
