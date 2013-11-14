namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerBaseViewBuilder{TView, TViewBuilder}"/>.
    /// </summary>
    public class SchedulerBaseViewBuilder<TView, TViewBuilder>
        where TView : class, ISchedulerView
        where TViewBuilder : SchedulerBaseViewBuilder<TView, TViewBuilder>
    {
        protected readonly TView view;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerBaseViewBuilder{TView, TViewBuilder}"/> class.
        /// </summary>
        /// <param name="view">The resource</param>
        /// 
        public SchedulerBaseViewBuilder(TView view)
        {
            this.view = view;
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
        public TViewBuilder Title(string title)
        {
            view.Title = title;

            return (TViewBuilder)this;
        }

        /// <summary>
        /// Sets the editing configuration of the current scheduler view.
        /// </summary>
        /// <param name="configurator">The lambda which configures the editing</param>
        public TViewBuilder Editable(Action<SchedulerViewEditableSettingsBuilder> configurator)
        {
            view.Editable = new SchedulerViewEditableSettings();

            configurator(new SchedulerViewEditableSettingsBuilder(view.Editable));

            return (TViewBuilder)this;
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
        public TViewBuilder Editable(bool isEditable)
        {
            view.Editable = new SchedulerViewEditableSettings();

            view.Editable.Enabled = isEditable;

            return (TViewBuilder)this;
        }

        /// <summary>
        /// The template used by the view to render the scheduler events.
        /// </summary>
        /// <param name="eventTemplate">The eventTemplate.</param>
        public TViewBuilder EventTemplate(string eventTemplate)
        {
            view.EventTemplate = eventTemplate;

            return (TViewBuilder)this;
        }

        /// <summary>
        /// The Id of the template used by the view to render the scheduler events.
        /// </summary>
        /// <param name="eventTemplateId">The eventTemplateId</param>
        public TViewBuilder EventTemplateId(string eventTemplateId)
        {
            view.EventTemplateId = eventTemplateId;

            return (TViewBuilder)this;
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
        public TViewBuilder SelectedDateFormat(string selectedDateFormat)
        {
            view.SelectedDateFormat = selectedDateFormat;

            return (TViewBuilder)this;
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
        public TViewBuilder Selected(bool isSelected)
        {
            view.Selected = isSelected;

            return (TViewBuilder)this;
        }

        /// <summary>
        /// Sets the orientation of the group headers
        /// </summary>
        /// <param name="orientation">The orientation</param>        
        public TViewBuilder Groups(SchedulerGroupOrientation orientation)
        {
            view.Group.Orientation = orientation;

            return (TViewBuilder)this;
        }

        /// <summary>
        /// Sets the resources grouping configuration of the view.
        /// </summary>
        /// <param name="configuration">The lambda which configures the view grouping</param>
        /// <summary>
        public TViewBuilder Groups(Action<SchedulerGroupBuilder> configuration)
        {
            var factory = new SchedulerGroupBuilder(view.Group);

            configuration(factory);

            return (TViewBuilder)this;
        }
    }

}
