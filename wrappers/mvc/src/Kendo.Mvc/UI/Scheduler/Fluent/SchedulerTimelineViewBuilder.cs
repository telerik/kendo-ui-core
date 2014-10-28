namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerTimelineView"/>.
    /// </summary>
    public class SchedulerTimelineViewBuilder<TView> : SchedulerTimelineViewBuilderBase<TView, SchedulerTimelineViewBuilder<TView>>
        where TView : SchedulerTimelineViewBase
    {
        public SchedulerTimelineViewBuilder(TView resource)
            : base(resource)
        {
        }
    }
}
