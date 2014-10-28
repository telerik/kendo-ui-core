namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerTimelineViewBase"/>.
    /// </summary>
    public abstract class SchedulerTimelineViewBuilderBase<TView, TTimelineViewBuilder> : SchedulerBaseViewBuilder<TView, TTimelineViewBuilder>
        where TView : SchedulerTimelineViewBase
        where TTimelineViewBuilder : SchedulerTimelineViewBuilderBase<TView, TTimelineViewBuilder>
    {

        public SchedulerTimelineViewBuilderBase(TView resource)
            : base(resource)
        {
        }

        /// <summary>
        /// The height of the scheduler event rendered in timeline view.
        /// </summary>
        /// <param name="eventHeight">The eventHeight</param>
        public TTimelineViewBuilder EventHeight(int eventHeight)
        {
            view.EventHeight = eventHeight;

            return (TTimelineViewBuilder)this;
        }
        
        /// <summary>
        /// The width of the scheduler timeline view column.
        /// </summary>
        /// <param name="columnWidth">The columnWidth</param>
        public TTimelineViewBuilder ColumnWidth(int columnWidth)
        {
            view.ColumnWidth = columnWidth;

            return (TTimelineViewBuilder)this;
        }

    }
}
