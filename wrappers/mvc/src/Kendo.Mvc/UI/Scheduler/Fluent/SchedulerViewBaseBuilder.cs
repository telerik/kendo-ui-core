namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewBaseBuilder{T}"/>.
    /// </summary>
    public class SchedulerViewBaseBuilder<T> : ISchedulerViewBuilder
        where T : class, ISchedulerView
    {
        protected readonly T resource;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerViewBaseBuilder{T}"/> class.
        /// </summary>
        /// <param name="resource">The resource</param>
        /// 
        public SchedulerViewBaseBuilder(T resource)
        {
            this.resource = resource;
        }

        /// <summary>
        /// The user-friendly title of the view displayed by the scheduler.
        /// </summary>
        /// <param name="title">The title</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt;
        ///     {
        ///         views.DayView(dayView =&gt; {
        ///             dayView.Title(&quot;Day&quot;);
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
        public ISchedulerViewBuilder Title(string title)
        {
            resource.Title = title;

            return this;
        }

        /// <summary>
        /// Sets the editing configuration of the current scheduler view.
        /// </summary>
        /// <param name="configurator">The lambda which configures the editing</param>
        public ISchedulerViewBuilder Editable(Action<SchedulerViewEditableSettingsBuilder> configurator)
        {
            resource.Editable = new SchedulerViewEditableSettings();

            configurator(new SchedulerViewEditableSettingsBuilder(resource.Editable));

            return this;
        }

        /// <summary>
        /// If set to true the user would be able to create new scheduler events and modify or delete existing ones. Default value is true.
        /// </summary>
        /// <param name="isEditable">The isEditable</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt;
        ///     {
        ///         views.DayView(dayView =&gt; {
        ///             dayView.Title(&quot;Day&quot;);
        ///             dayView.Editable(false);
        ///         });
        ///         views.AgendaView();
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
        public ISchedulerViewBuilder Editable(bool isEditable)
        {
            resource.Editable = new SchedulerViewEditableSettings();

            resource.Editable.Enable = isEditable;

            return this;
        }

        /// <summary>
        /// The template used by the view to render the scheduler events.
        /// </summary>
        /// <param name="eventTemplate">The eventTemplate.</param>
        public ISchedulerViewBuilder EventTemplate(string eventTemplate)
        {
            resource.EventTemplate = eventTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used by the view to render the scheduler events.
        /// </summary>
        /// <param name="eventTemplateId">The eventTemplateId</param>
        public ISchedulerViewBuilder EventTemplateId(string eventTemplateId)
        {
            resource.EventTemplateId = eventTemplateId;

            return this;
        }

        /// <summary>
        /// The format used to display the selected date. Uses kendo.format.
        /// Contains two placeholders - "{0}" and "{1}" which represent the start and end date displayed by the view.
        /// </summary>
        /// <param name="selectedDateFormat">The selectedDateFormat.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt;
        ///     {
        ///         views.DayView(dayView =&gt; {
        ///             dayView.Title(&quot;Day&quot;);
        ///             dayView.Editable(false);
        ///             dayView.SelectedDateFormat(&quot;{0:dd-MM-yyyy}&quot;);
        ///         });
        ///         views.AgendaView();
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
        public ISchedulerViewBuilder SelectedDateFormat(string selectedDateFormat)
        {
            resource.SelectedDateFormat = selectedDateFormat;

            return this;
        }

        /// <summary>
        /// If set to true the view will be initially selected by the scheduler widget. Default value is false.
        /// </summary>
        /// <param name="isSelected">The isSelected</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt;
        ///     {
        ///         views.DayView(dayView =&gt; {
        ///             dayView.Title(&quot;Day&quot;);
        ///             dayView.Editable(false);
        ///             dayView.SelectedDateFormat(&quot;{0:dd-MM-yyyy}&quot;);
        ///             dayView.Selected(true);
        ///         });
        ///         views.AgendaView();
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
        public ISchedulerViewBuilder Selected(bool isSelected)
        {
            resource.Selected = isSelected;

            return this;
        }
    }

}
