namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewWeek"/>.
    /// </summary>
    public class SchedulerViewMultiDayBuilder<TView> : SchedulerViewBaseBuilder<TView, SchedulerViewMultiDayBuilder<TView>>
        where TView : SchedulerViewMultiDay
    {
        public SchedulerViewMultiDayBuilder(TView resource)
            : base(resource)
        {
        }

        /// <summary>
        /// The template used to render the "all day" scheduler events.
        /// </summary>
        /// <param name="allDayEventTemplate">The allDayEventTemplate</param>
        public SchedulerViewMultiDayBuilder<TView> AllDayEventTemplate(string allDayEventTemplate)
        {
            view.AllDayEventTemplate = allDayEventTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the "all day" scheduler events.
        /// </summary>
        /// <param name="allDayEventTemplateId">The allDayEventTemplateId</param>
        public SchedulerViewMultiDayBuilder<TView> AllDayEventTemplateId(string allDayEventTemplateId)
        {
            view.AllDayEventTemplateId = allDayEventTemplateId;

            return this;
        }

        /// <summary>
        /// If set to true the scheduler will display a slot for "all day" events. Default value is true.
        /// </summary>
        /// <param name="allDaySlot">The allDaySlot</param>
        public SchedulerViewMultiDayBuilder<TView> AllDaySlot(bool allDaySlot)
        {
            view.AllDaySlot = allDaySlot;

            return this;
        }

        /// <summary>
        /// The template used to render the date header cells.
        /// </summary>
        /// <param name="dateHeaderTemplate">The dateHeaderTemplate</param>
        public SchedulerViewMultiDayBuilder<TView> DateHeaderTemplate(string dateHeaderTemplate)
        {
            view.DateHeaderTemplate = dateHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the date header cells.
        /// </summary>
        /// <param name="dateHeaderTemplateId">The dateHeaderTemplateId</param>
        public SchedulerViewMultiDayBuilder<TView> DateHeaderTemplateId(string dateHeaderTemplateId)
        {
            view.DateHeaderTemplateId = dateHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The number of minutes represented by a major tick.
        /// </summary>
        /// <param name="majorTick">The majorTick</param>
        public SchedulerViewMultiDayBuilder<TView> MajorTick(int majorTick)
        {
            view.MajorTick = majorTick;

            return this;
        }

        /// <summary>
        /// The template used to render the all day slot content
        /// </summary>
        /// <param name="slotTemplate">The slotTemplate</param>
        public SchedulerViewMultiDayBuilder<TView> AllDaySlotTemplate(string slotTemplate)
        {
            view.AllDaySlotTemplate = slotTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the all day slot content.
        /// </summary>
        /// <param name="slotTemplateId">The id of template</param>
        public SchedulerViewMultiDayBuilder<TView> AllDaySlotTemplateId(string templateId)
        {
            view.AllDaySlotTemplateId = templateId;

            return this;
        }
        /// <summary>
        /// The template used to render the slot content
        /// </summary>
        /// <param name="slotTemplate">The slotTemplate</param>
        public SchedulerViewMultiDayBuilder<TView> SlotTemplate(string slotTemplate)
        {
            view.SlotTemplate = slotTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the slot content.
        /// </summary>
        /// <param name="slotTemplateId">The id of template</param>
        public SchedulerViewMultiDayBuilder<TView> SlotTemplateId(string templateId)
        {
            view.SlotTemplateId = templateId;

            return this;
        }

        /// <summary>
        /// The template used to render the major ticks.
        /// </summary>
        /// <param name="majorTimeHeaderTemplate">The majorTimeHeaderTemplate</param>
        public SchedulerViewMultiDayBuilder<TView> MajorTimeHeaderTemplate(string majorTimeHeaderTemplate)
        {
            view.MajorTimeHeaderTemplate = majorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the major ticks.
        /// </summary>
        /// <param name="majorTimeHeaderTemplateId">The majorTimeHeaderTemplateId</param>
        public SchedulerViewMultiDayBuilder<TView> MajorTimeHeaderTemplateId(string majorTimeHeaderTemplateId)
        {
            view.MajorTimeHeaderTemplateId = majorTimeHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The number of time slots to display per major tick.
        /// </summary>
        /// <param name="minorTickCount">The minorTickCount</param>
        public SchedulerViewMultiDayBuilder<TView> MinorTickCount(int minorTickCount)
        {
            view.MinorTickCount = minorTickCount;

            return this;
        }

        /// <summary>
        /// The template used to render the minor ticks.
        /// </summary>
        /// <param name="minorTimeHeaderTemplate">The minorTimeHeaderTemplate</param>
        public SchedulerViewMultiDayBuilder<TView> MinorTimeHeaderTemplate(string minorTimeHeaderTemplate)
        {
            view.MinorTimeHeaderTemplate = minorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the minor ticks.
        /// </summary>
        /// <param name="minorTimeHeaderTemplateId">The minorTimeHeaderTemplateId</param>
        public SchedulerViewMultiDayBuilder<TView> MinorTimeHeaderTemplateId(string minorTimeHeaderTemplateId)
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
        public SchedulerViewMultiDayBuilder<TView> StartTime(DateTime startTime)
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
        public SchedulerViewMultiDayBuilder<TView> StartTime(int hours, int minutes, int seconds)
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
        public SchedulerViewMultiDayBuilder<TView> EndTime(DateTime endTime)
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
        public SchedulerViewMultiDayBuilder<TView> EndTime(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            view.EndTime = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// The start time of the business hours. The scheduler will display events after the workDayStart if "WorkDayCommand" button is clicked.
        /// </summary>
        /// <param name="workDayStart">The WorkDayStart</param>
        public SchedulerViewMultiDayBuilder<TView> WorkDayStart(DateTime workDayStart)
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
        public SchedulerViewMultiDayBuilder<TView> WorkDayStart(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            view.WorkDayStart = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// The end time of the business hours. The scheduler will display events before the workDayEnd if "WorkDayCommand" button is clicked.
        /// </summary>
        /// <param name="workDayEnd">The WorkDayEnd</param>
        public SchedulerViewMultiDayBuilder<TView> WorkDayEnd(DateTime workDayEnd)
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
        public SchedulerViewMultiDayBuilder<TView> WorkDayEnd(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            view.WorkDayEnd = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// If set to false the scheduler will not display the "WorkDayCommand" button. Default value is true.
        /// </summary>
        /// <param name="showWorkDayCommand">The showWorkDayCommand</param>
        public SchedulerViewMultiDayBuilder<TView> WorkDayCommand(bool showWorkDayCommand)
        {
            view.WorkDayCommand = showWorkDayCommand;

            return this;
        }

        /// <summary>
        /// If set to false the scheduler will not display the "footer" area. Default value is true.
        /// </summary>
        /// <param name="footer">The footer</param>
        public SchedulerViewMultiDayBuilder<TView> Footer(bool showFooter)
        {
            view.Footer = showFooter;

            return this;
        }

        /// <summary>
        /// Defines the working days of the week
        /// </summary>
        /// <param name="days">An array of working week days</param>
        public SchedulerViewMultiDayBuilder<TView> WorkWeekDays(params DayOfWeek[] days)
        {
            view.WorkWeekDays = days;

            return this;
        }

    }
}
