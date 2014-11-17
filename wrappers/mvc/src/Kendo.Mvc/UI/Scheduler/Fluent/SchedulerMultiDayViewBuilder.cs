namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerMultiDayView"/>.
    /// </summary>
    public class SchedulerMultiDayViewBuilder<TView> : SchedulerBaseViewBuilder<TView, SchedulerMultiDayViewBuilder<TView>>
        where TView : SchedulerMultiDayView
    {
        public SchedulerMultiDayViewBuilder(TView resource)
            : base(resource)
        {
        }

        /// <summary>
        /// The template used to render the "all day" scheduler events.
        /// </summary>
        /// <param name="allDayEventTemplate">The allDayEventTemplate</param>
        public SchedulerMultiDayViewBuilder<TView> AllDayEventTemplate(string allDayEventTemplate)
        {
            view.AllDayEventTemplate = allDayEventTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the "all day" scheduler events.
        /// </summary>
        /// <param name="allDayEventTemplateId">The allDayEventTemplateId</param>
        public SchedulerMultiDayViewBuilder<TView> AllDayEventTemplateId(string allDayEventTemplateId)
        {
            view.AllDayEventTemplateId = allDayEventTemplateId;

            return this;
        }

        /// <summary>
        /// The template used to render the group headers of scheduler day, week, workWeek and timeline views.
        /// </summary>
        /// <param name="groupHeaderTemplate">The groupHeaderTemplate</param>
        public SchedulerMultiDayViewBuilder<TView> GroupHeaderTemplate(string groupHeaderTemplate)
        {
            view.GroupHeaderTemplate = groupHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the group headers of scheduler day, week, workWeek and timeline views.
        /// </summary>
        /// <param name="groupHeaderTemplateId">The groupHeaderTemplateId</param>
        public SchedulerMultiDayViewBuilder<TView> GroupHeaderTemplateId(string groupHeaderTemplateId)
        {
            view.GroupHeaderTemplateId = groupHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// If set to true the scheduler will display a slot for "all day" events. Default value is true.
        /// </summary>
        /// <param name="allDaySlot">The allDaySlot</param>
        public SchedulerMultiDayViewBuilder<TView> AllDaySlot(bool allDaySlot)
        {
            view.AllDaySlot = allDaySlot;

            return this;
        }

        /// <summary>
        /// The template used to render the date header cells.
        /// </summary>
        /// <param name="dateHeaderTemplate">The dateHeaderTemplate</param>
        public SchedulerMultiDayViewBuilder<TView> DateHeaderTemplate(string dateHeaderTemplate)
        {
            view.DateHeaderTemplate = dateHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the date header cells.
        /// </summary>
        /// <param name="dateHeaderTemplateId">The dateHeaderTemplateId</param>
        public SchedulerMultiDayViewBuilder<TView> DateHeaderTemplateId(string dateHeaderTemplateId)
        {
            view.DateHeaderTemplateId = dateHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The number of minutes represented by a major tick.
        /// </summary>
        /// <param name="majorTick">The majorTick</param>
        public SchedulerMultiDayViewBuilder<TView> MajorTick(int majorTick)
        {
            view.MajorTick = majorTick;

            return this;
        }

        /// <summary>
        /// The template used to render the all day slot content
        /// </summary>
        /// <param name="slotTemplate">The slotTemplate</param>
        public SchedulerMultiDayViewBuilder<TView> AllDaySlotTemplate(string slotTemplate)
        {
            view.AllDaySlotTemplate = slotTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the all day slot content.
        /// </summary>
        /// <param name="slotTemplateId">The id of template</param>
        public SchedulerMultiDayViewBuilder<TView> AllDaySlotTemplateId(string slotTemplateId)
        {
            view.AllDaySlotTemplateId = slotTemplateId;

            return this;
        }
        /// <summary>
        /// The template used to render the slot content
        /// </summary>
        /// <param name="slotTemplate">The slotTemplate</param>
        public SchedulerMultiDayViewBuilder<TView> SlotTemplate(string slotTemplate)
        {
            view.SlotTemplate = slotTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the slot content.
        /// </summary>
        /// <param name="slotTemplateId">The id of template</param>
        public SchedulerMultiDayViewBuilder<TView> SlotTemplateId(string slotTemplateId)
        {
            view.SlotTemplateId = slotTemplateId;

            return this;
        }

        /// <summary>
        /// The template used to render the major ticks.
        /// </summary>
        /// <param name="majorTimeHeaderTemplate">The majorTimeHeaderTemplate</param>
        public SchedulerMultiDayViewBuilder<TView> MajorTimeHeaderTemplate(string majorTimeHeaderTemplate)
        {
            view.MajorTimeHeaderTemplate = majorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the major ticks.
        /// </summary>
        /// <param name="majorTimeHeaderTemplateId">The majorTimeHeaderTemplateId</param>
        public SchedulerMultiDayViewBuilder<TView> MajorTimeHeaderTemplateId(string majorTimeHeaderTemplateId)
        {
            view.MajorTimeHeaderTemplateId = majorTimeHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The number of time slots to display per major tick.
        /// </summary>
        /// <param name="minorTickCount">The minorTickCount</param>
        public SchedulerMultiDayViewBuilder<TView> MinorTickCount(int minorTickCount)
        {
            view.MinorTickCount = minorTickCount;

            return this;
        }

        /// <summary>
        /// The template used to render the minor ticks.
        /// </summary>
        /// <param name="minorTimeHeaderTemplate">The minorTimeHeaderTemplate</param>
        public SchedulerMultiDayViewBuilder<TView> MinorTimeHeaderTemplate(string minorTimeHeaderTemplate)
        {
            view.MinorTimeHeaderTemplate = minorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the minor ticks.
        /// </summary>
        /// <param name="minorTimeHeaderTemplateId">The minorTimeHeaderTemplateId</param>
        public SchedulerMultiDayViewBuilder<TView> MinorTimeHeaderTemplateId(string minorTimeHeaderTemplateId)
        {
            view.MinorTimeHeaderTemplateId = minorTimeHeaderTemplateId;

            return this;
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
        public SchedulerMultiDayViewBuilder<TView> StartTime(DateTime startTime)
        {
            view.StartTime = startTime;

            return this;
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
        ///         views.DayView(dayView =&gt; {
        ///             dayView.Title(&quot;Day&quot;);
        ///             dayView.StartTime(10,0,0);
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
        public SchedulerMultiDayViewBuilder<TView> StartTime(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            view.StartTime = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

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
        public SchedulerMultiDayViewBuilder<TView> EndTime(DateTime endTime)
        {
            view.EndTime = endTime;

            return this;
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
        ///         views.DayView(dayView =&gt; {
        ///             dayView.Title(&quot;Day&quot;);
        ///             dayView.StartTime(new DateTime(2013, 6, 13, 10, 00, 00));
        ///             dayView.EndTime(23,0,0);
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
        public SchedulerMultiDayViewBuilder<TView> EndTime(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            view.EndTime = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// The start time of the business hours. The scheduler will display events after the workDayStart if "WorkDayCommand" button is clicked.
        /// </summary>
        /// <param name="workDayStart">The WorkDayStart</param>
        public SchedulerMultiDayViewBuilder<TView> WorkDayStart(DateTime workDayStart)
        {
            view.WorkDayStart = workDayStart;

            return this;
        }

        /// <summary>
        /// The start time of the business hours. The scheduler will display events after the workDayStart if "WorkDayCommand" button is clicked.
        /// </summary>
        /// <param name="hours">The hours</param>
        /// <param name="minutes">The minutes</param>
        /// <param name="seconds">The seconds</param>
        public SchedulerMultiDayViewBuilder<TView> WorkDayStart(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            view.WorkDayStart = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// The end time of the business hours. The scheduler will display events before the workDayEnd if "WorkDayCommand" button is clicked.
        /// </summary>
        /// <param name="workDayEnd">The WorkDayEnd</param>
        public SchedulerMultiDayViewBuilder<TView> WorkDayEnd(DateTime workDayEnd)
        {
            view.WorkDayEnd = workDayEnd;

            return this;
        }

        /// <summary>
        /// The end time of the business hours. The scheduler will display events before the workDayEnd if "WorkDayCommand" button is clicked.
        /// </summary>
        /// <param name="hours">The hours</param>
        /// <param name="minutes">The minutes</param>
        /// <param name="seconds">The seconds</param>
        public SchedulerMultiDayViewBuilder<TView> WorkDayEnd(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            view.WorkDayEnd = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// If set to false the scheduler will not display the "WorkDayCommand" button. Default value is true.
        /// </summary>
        /// <param name="showWorkDayCommand">The showWorkDayCommand</param>
        public SchedulerMultiDayViewBuilder<TView> WorkDayCommand(bool showWorkDayCommand)
        {
            view.WorkDayCommand = showWorkDayCommand;

            return this;
        }

        /// <summary>
        /// If set to true the view will be initially shown in business hours mode.
        /// </summary>
        /// <param name="value"></param>
        public SchedulerMultiDayViewBuilder<TView> ShowWorkHours(bool value)
        {
            view.ShowWorkHours = value;

            return this;
        }

        /// <summary>
        /// If set the view will be initially shown in business hours mode.
        /// </summary>        
        public SchedulerMultiDayViewBuilder<TView> ShowWorkHours()
        {
            view.ShowWorkHours = true;

            return this;
        }

        /// <summary>
        /// If set to false the scheduler will not display the "footer" area. Default value is true.
        /// </summary>
        /// <param name="showFooter">The footer</param>
        public SchedulerMultiDayViewBuilder<TView> Footer(bool showFooter)
        {
            view.Footer = showFooter;

            return this;
        }

        /// <summary>
        /// Sets the start day of work week by index.
        /// </summary>
        /// <param name="workWeekStartDay">The workWeekStartDay</param>
        public SchedulerMultiDayViewBuilder<TView> WorkWeekStart(int workWeekStartDay)
        {
            view.WorkWeekStart = workWeekStartDay;

            return this;
        }

        /// <summary>
        /// Sets the end day of work week by index.
        /// </summary>
        /// <param name="workWeekEndDay">The workWeekEndDay</param>
        public SchedulerMultiDayViewBuilder<TView> WorkWeekEnd(int workWeekEndDay)
        {
            view.WorkWeekEnd = workWeekEndDay;

            return this;
        }

    }
}
