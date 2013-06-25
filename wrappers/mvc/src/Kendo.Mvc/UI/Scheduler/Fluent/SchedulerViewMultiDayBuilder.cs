namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewWeek"/>.
    /// </summary>
    public class SchedulerViewMultiDayBuilder<T> : SchedulerViewBaseBuilder<T>, ISchedulerViewBuilder
        where T : SchedulerViewMultiDay
    {
        public SchedulerViewMultiDayBuilder(T resource)
            : base(resource)
        {
        }

        /// <summary>
        /// The template used to render the "all day" scheduler events.
        /// </summary>
        /// <param name="allDayEventTemplate">The allDayEventTemplate</param>
        public ISchedulerViewBuilder AllDayEventTemplate(string allDayEventTemplate)
        {
            resource.AllDayEventTemplate = allDayEventTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the "all day" scheduler events.
        /// </summary>
        /// <param name="allDayEventTemplateId">The allDayEventTemplateId</param>
        public ISchedulerViewBuilder AllDayEventTemplateId(string allDayEventTemplateId)
        {
            resource.AllDayEventTemplateId = allDayEventTemplateId;

            return this;
        }

        /// <summary>
        /// If set to true the scheduler will display a slot for "all day" events. Default value is true.
        /// </summary>
        /// <param name="allDaySlot">The allDaySlot</param>
        public ISchedulerViewBuilder AllDaySlot(bool allDaySlot)
        {
            resource.AllDaySlot = allDaySlot;

            return this;
        }

        /// <summary>
        /// The template used to render the date header cells.
        /// </summary>
        /// <param name="dateHeaderTemplate">The dateHeaderTemplate</param>
        public ISchedulerViewBuilder DateHeaderTemplate(string dateHeaderTemplate)
        {
            resource.DateHeaderTemplate = dateHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the date header cells.
        /// </summary>
        /// <param name="dateHeaderTemplateId">The dateHeaderTemplateId</param>
        public ISchedulerViewBuilder DateHeaderTemplateId(string dateHeaderTemplateId)
        {
            resource.DateHeaderTemplateId = dateHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The number of minutes represented by a major tick.
        /// </summary>
        /// <param name="majorTick">The majorTick</param>
        public ISchedulerViewBuilder MajorTick(int majorTick)
        {
            resource.MajorTick = majorTick;

            return this;
        }

        /// <summary>
        /// The template used to render the major ticks.
        /// </summary>
        /// <param name="majorTimeHeaderTemplate">The majorTimeHeaderTemplate</param>
        public ISchedulerViewBuilder MajorTimeHeaderTemplate(string majorTimeHeaderTemplate)
        {
            resource.MajorTimeHeaderTemplate = majorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the major ticks.
        /// </summary>
        /// <param name="majorTimeHeaderTemplateId">The majorTimeHeaderTemplateId</param>
        public ISchedulerViewBuilder MajorTimeHeaderTemplateId(string majorTimeHeaderTemplateId)
        {
            resource.MajorTimeHeaderTemplateId = majorTimeHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The number of time slots to display per major tick.
        /// </summary>
        /// <param name="minorTickCount">The minorTickCount</param>
        public ISchedulerViewBuilder MinorTickCount(int minorTickCount)
        {
            resource.MinorTickCount = minorTickCount;

            return this;
        }

        /// <summary>
        /// The template used to render the minor ticks.
        /// </summary>
        /// <param name="minorTimeHeaderTemplate">The minorTimeHeaderTemplate</param>
        public ISchedulerViewBuilder MinorTimeHeaderTemplate(string minorTimeHeaderTemplate)
        {
            resource.MinorTimeHeaderTemplate = minorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the minor ticks.
        /// </summary>
        /// <param name="minorTimeHeaderTemplateId">The minorTimeHeaderTemplateId</param>
        public ISchedulerViewBuilder MinorTimeHeaderTemplateId(string minorTimeHeaderTemplateId)
        {
            resource.MinorTimeHeaderTemplateId = minorTimeHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The start time of the view. The scheduler will display events starting after the startTime.
        /// </summary>
        /// <param name="starTime">The startTime</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt;
        ///     {
        ///         views.DayView(dayView =&gt; {
        ///             dayView.Title(&quot;Day&quot;);
        ///             dayView.StartTime(new DateTime(2013, 6, 13, 10, 00, 00));
        ///             dayView.EndTime(new DateTime(2013, 6, 13, 23, 00, 00));
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
        public ISchedulerViewBuilder StartTime(DateTime startTime)
        {
            resource.StartTime = startTime;

            return this;
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
        ///         views.DayView(dayView =&gt; {
        ///             dayView.Title(&quot;Day&quot;);
        ///             dayView.StartTime(new DateTime(2013, 6, 13, 10, 00, 00));
        ///             dayView.EndTime(new DateTime(2013, 6, 13, 23, 00, 00));
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
        public ISchedulerViewBuilder EndTime(DateTime endTime)
        {
            resource.EndTime = endTime;

            return this;
        }
    }
}
