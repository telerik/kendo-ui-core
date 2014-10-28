namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerTimelineWorkWeekView"/>.
    /// </summary>
    public class SchedulerTimelineWorkWeekViewBuilder<TView> : SchedulerTimelineViewBuilderBase<TView, SchedulerTimelineWorkWeekViewBuilder<TView>>
        where TView : SchedulerTimelineViewBase
    {
        public SchedulerTimelineWorkWeekViewBuilder(TView resource)
            : base(resource)
        {
        }
    }
}
