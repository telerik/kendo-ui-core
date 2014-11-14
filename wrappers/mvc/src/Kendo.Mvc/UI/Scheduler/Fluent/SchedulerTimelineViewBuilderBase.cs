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

        /// <summary>
        /// The number of minutes represented by a major tick.
        /// </summary>
        /// <param name="majorTick">The majorTick</param>
        public TTimelineViewBuilder MajorTick(int majorTick)
        {
            view.MajorTick = majorTick;

            return (TTimelineViewBuilder)this;
        }


        /// <summary>
        /// The number of time slots to display per major tick.
        /// </summary>
        /// <param name="minorTickCount">The minorTickCount</param>
        public TTimelineViewBuilder MinorTickCount(int minorTickCount)
        {
            view.MinorTickCount = minorTickCount;

            return (TTimelineViewBuilder)this;
        }

        /// <summary>
        /// The start time of the view. The scheduler will display events starting after the startTime.
        /// </summary>
        /// <param name="startTime">The startTime</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt;
        ///     {
        ///         views.TimelineView(timelineView =&gt; {
        ///             timelineView.Title(&quot;Day&quot;);
        ///             timelineView.StartTime(new DateTime(2013, 6, 13, 10, 00, 00));
        ///             timelineView.EndTime(new DateTime(2013, 6, 13, 23, 00, 00));
        ///         });
        ///     })
        ///     .DataSource(d =&gt; d
        ///         .Model(m =&gt; m.Id(f =&gt; f.TaskID))
        ///             .Read(&quot;Read&quot;, &quot;Scheduler&quot;)
        ///             .Create(&quot;Create&quot;, &quot;Scheduler&quot;)
        ///             .Destroy(&quot;Destroy&quot;, &quot;Scheduler&quot;)
        ///             .Update(&quot;Update&quot;, &quot;Scheduler&quot;)
        ///     )
        /// )
        /// </code>
        /// </example>
        public TTimelineViewBuilder StartTime(DateTime startTime)
        {
            view.StartTime = startTime;

            return (TTimelineViewBuilder)this;
        }

        /// <summary>
        /// The start time of the view. The scheduler will display events starting after the startTime.
        /// </summary>
        /// <param name="hours">The hours</param>
        /// <param name="minutes">The minutes</param>
        /// <param name="seconds">The seconds</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt;
        ///     {
        ///         views.TimelineView(timelineView =&gt; {
        ///             timelineView.Title(&quot;Day&quot;);
        ///             timelineView.StartTime(10,0,0);
        ///             timelineView.EndTime(new DateTime(2013, 6, 13, 23, 00, 00));
        ///         });
        ///     })
        ///     .DataSource(d =&gt; d
        ///         .Model(m =&gt; m.Id(f =&gt; f.TaskID))
        ///             .Read(&quot;Read&quot;, &quot;Scheduler&quot;)
        ///             .Create(&quot;Create&quot;, &quot;Scheduler&quot;)
        ///             .Destroy(&quot;Destroy&quot;, &quot;Scheduler&quot;)
        ///             .Update(&quot;Update&quot;, &quot;Scheduler&quot;)
        ///     )
        /// )
        /// </code>
        /// </example>
        public TTimelineViewBuilder StartTime(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            view.StartTime = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return (TTimelineViewBuilder)this;
        }

        /// <summary>
        /// The end time of the view. The scheduler will display events ending before the endTime.
        /// </summary>
        /// <param name="endTime">The endTime</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt;
        ///     {
        ///         views.TimelineView(timelineView =&gt; {
        ///             timelineView.Title(&quot;Day&quot;);
        ///             timelineView.StartTime(new DateTime(2013, 6, 13, 10, 00, 00));
        ///             timelineView.EndTime(new DateTime(2013, 6, 13, 23, 00, 00));
        ///         });
        ///     })
        ///     .DataSource(d =&gt; d
        ///         .Model(m =&gt; m.Id(f =&gt; f.TaskID))
        ///             .Read(&quot;Read&quot;, &quot;Scheduler&quot;)
        ///             .Create(&quot;Create&quot;, &quot;Scheduler&quot;)
        ///             .Destroy(&quot;Destroy&quot;, &quot;Scheduler&quot;)
        ///             .Update(&quot;Update&quot;, &quot;Scheduler&quot;)
        ///     )
        /// )
        /// </code>
        /// </example>
        public TTimelineViewBuilder EndTime(DateTime endTime)
        {
            view.EndTime = endTime;

            return (TTimelineViewBuilder)this;
        }

        /// <summary>
        /// The end time of the view. The scheduler will display events ending before the endTime.
        /// </summary>
        /// <param name="hours">The hours</param>
        /// <param name="minutes">The minutes</param>
        /// <param name="seconds">The seconds</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt;
        ///     {
        ///         views.TimelineView(timelineView =&gt; {
        ///             timelineView.Title(&quot;Day&quot;);
        ///             timelineView.StartTime(new DateTime(2013, 6, 13, 10, 00, 00));
        ///             timelineView.EndTime(23,0,0);
        ///         });
        ///     })
        ///     .DataSource(d =&gt; d
        ///         .Model(m =&gt; m.Id(f =&gt; f.TaskID))
        ///             .Read(&quot;Read&quot;, &quot;Scheduler&quot;)
        ///             .Create(&quot;Create&quot;, &quot;Scheduler&quot;)
        ///             .Destroy(&quot;Destroy&quot;, &quot;Scheduler&quot;)
        ///             .Update(&quot;Update&quot;, &quot;Scheduler&quot;)
        ///     )
        /// )
        /// </code>
        /// </example>
        public TTimelineViewBuilder EndTime(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            view.EndTime = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return (TTimelineViewBuilder)this;
        }


    }
}
