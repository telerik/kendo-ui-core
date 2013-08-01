namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Scheduler{TModel}"/>.
    /// </summary>
    public class SchedulerBuilder<TModel> : WidgetBuilderBase<Scheduler<TModel>, SchedulerBuilder<TModel>> where TModel : class, ISchedulerEvent
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerBuilder{TModel}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public SchedulerBuilder(Scheduler<TModel> component)
            : base(component)
        {
        }

        /// <summary>
        /// The current date of the scheduler. Used to determine the period which is displayed by the widget.
        /// </summary>
        /// <param name="date">The Date</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> Date(DateTime date)
        {
            Component.Date = date;

            return this;
        }

        /// <summary>
        /// The start time of the week and day views. The scheduler will display events starting after the startTime.
        /// </summary>
        /// <param name="startTime">The startTime.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> StartTime(DateTime startTime)
        {
            Component.StartTime = startTime;

            return this;
        }

        /// <summary>
        /// The start time of the week and day views. The scheduler will display events starting after the startTime.
        /// </summary>
        /// <param name="hours">The hours</param>
        /// <param name="minutes">The minutes</param>
        /// <param name="seconds">The seconds</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .StartTime(10, 0, 0)
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> StartTime(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            Component.StartTime = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// The end time of the week and day views. The scheduler will display events ending before the endTime.
        /// </summary>
        /// <param name="endTime">The endTime.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> EndTime(DateTime endTime)
        {
            Component.EndTime = endTime;

            return this;
        }

        /// <summary>
        /// The end time of the week and day views. The scheduler will display events ending before the endTime.
        /// </summary>
        /// <param name="hours">The hours</param>
        /// <param name="minutes">The minutes</param>
        /// <param name="seconds">The seconds</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .EndTime(10,0,0)
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> EndTime(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            Component.EndTime = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// The height of the widget.
        /// </summary>
        /// <param name="height">The height.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Height(600)
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> Height(int height)
        {
            Component.Height = height;

            return this;
        }

        /// <summary>
        /// The template used to render the scheduler events.
        /// </summary>
        /// <param name="eventTemplate">The eventTemplate.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        /// 	.Name(&quot;scheduler&quot;)
        /// 	.Date(new DateTime(2013, 6, 13))
        /// 	.StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
        /// 	.EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
        /// 	.Height(600)
        /// 	.EventTemplate(
        /// 		&quot;&lt;div style='color:white'&gt;&quot; +
        /// 			&quot;&lt;img src='&quot; + Url.Content(&quot;~/Content/web/scheduler/&quot;) + &quot;#= Image #' style='float:left'&gt;&quot; +
        /// 			&quot;&lt;p&gt;&quot; +
        /// 				&quot;#: kendo.toString(Start, 'hh:mm') # - #: kendo.toString(End, 'hh:mm') #&quot; +
        /// 			&quot;&lt;/p&gt;&quot; +
        /// 			&quot;&lt;h3&gt;#: title #&lt;/h3&gt;&quot; +
        /// 				&quot;&lt;a href='#= Imdb #' style='color:white'&gt;Movie in IMDB&lt;/a&gt;&quot; +
        /// 		&quot;&lt;/div&gt;&quot;)
        /// 	.Views(views =&gt;
        /// 		{
        /// 			views.DayView();
        /// 			views.AgendaView();
        /// 		})
        /// 	.BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> EventTemplate(string eventTemplate)
        {
            Component.EventTemplate = eventTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the scheduler events.
        /// </summary>
        /// <param name="eventTemplateId">The eventTemplateId</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        /// 	.Name(&quot;scheduler&quot;)
        /// 	.Date(new DateTime(2013, 6, 13))
        /// 	.StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
        /// 	.EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
        /// 	.Height(600)
        /// 	.EventTemplateId("customEventTemplate")
        /// 	.Views(views =&gt;
        /// 		{
        /// 			views.DayView();
        /// 			views.AgendaView();
        /// 		})
        /// 	.BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> EventTemplateId(string eventTemplateId)
        {
            Component.EventTemplateId = eventTemplateId;

            return this;
        }

        /// <summary>
        /// The template used to render the "all day" scheduler events.
        /// </summary>
        /// <param name="allDayEventTemplate">The allDayEventTemplate</param>
        public SchedulerBuilder<TModel> AllDayEventTemplate(string allDayEventTemplate)
        {
            Component.AllDayEventTemplate = allDayEventTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the "all day" scheduler events.
        /// </summary>
        /// <param name="allDayEventTemplateId">The allDayEventTemplateId</param>
        public SchedulerBuilder<TModel> AllDayEventTemplateId(string allDayEventTemplateId)
        {
            Component.AllDayEventTemplateId = allDayEventTemplateId;

            return this;
        }

        /// <summary>
        /// If set to true the scheduler will display a slot for "all day" events.
        /// </summary>
        /// <param name="allDaySlot">The allDaySlot.</param>
        public SchedulerBuilder<TModel> AllDaySlot(bool allDaySlot)
        {
            Component.AllDaySlot = allDaySlot;

            return this;
        }

        /// <summary>
        /// If set to true the scheduler will enable the selection
        /// </summary>
        /// <param name="selectable">The selectable.</param>
        public SchedulerBuilder<TModel> Selectable(bool selectable)
        {
            Component.Selectable = selectable;

            return this;
        }

        /// <summary>
        /// The template used to render the date header cells.
        /// </summary>
        /// <param name="dateHeaderTemplate">The dateHeaderTemplate</param>
        public SchedulerBuilder<TModel> DateHeaderTemplate(string dateHeaderTemplate)
        {
            Component.DateHeaderTemplate = dateHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the date header cells.
        /// </summary>
        /// <param name="dateHeaderTemplateId">The dateHeaderTemplateId</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        /// 	.Name(&quot;scheduler&quot;)
        /// 	.Date(new DateTime(2013, 6, 13))
        /// 	.StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
        /// 	.EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
        /// 	.Height(600)
        /// 	.AllDayEventTemplateId("customAllDayTemplate")
        /// 	.Views(views =&gt;
        /// 		{
        /// 			views.DayView();
        /// 			views.AgendaView();
        /// 		})
        /// 	.BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> DateHeaderTemplateId(string dateHeaderTemplateId)
        {
            Component.DateHeaderTemplateId = dateHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The number of minutes represented by a major tick.
        /// </summary>
        /// <param name="majorTick">The majorTick</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Height(600)
        ///     .MajorTick(120)
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> MajorTick(int majorTick)
        {
            Component.MajorTick = majorTick;

            return this;
        }

        /// <summary>
        /// The template used to render the major ticks.
        /// </summary>
        /// <param name="majorTimeHeaderTemplate">The majorTimeHeaderTemplate</param>
        public SchedulerBuilder<TModel> MajorTimeHeaderTemplate(string majorTimeHeaderTemplate)
        {
            Component.MajorTimeHeaderTemplate = majorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the major ticks.
        /// </summary>
        /// <param name="majorTimeHeaderTemplateId">The majorTimeHeaderTemplateId</param>
        public SchedulerBuilder<TModel> MajorTimeHeaderTemplateId(string majorTimeHeaderTemplateId)
        {
            Component.MajorTimeHeaderTemplateId = majorTimeHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The number of time slots to display per major tick.
        /// </summary>
        /// <param name="minorTickCount">The minorTickCount</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 7, 23))
        ///     .Height(400)
        ///     .MinorTickCount(1)
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> MinorTickCount(int minorTickCount)
        {
            Component.MinorTickCount = minorTickCount;

            return this;
        }

        /// <summary>
        /// The template used to render the minor ticks.
        /// </summary>
        /// <param name="minorTimeHeaderTemplate">The minorTimeHeaderTemplate</param>
        public SchedulerBuilder<TModel> MinorTimeHeaderTemplate(string minorTimeHeaderTemplate)
        {
            Component.MinorTimeHeaderTemplate = minorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the minor ticks.
        /// </summary>
        /// <param name="minorTimeHeaderTemplateId">The minorTimeHeaderTemplateId</param>
        public SchedulerBuilder<TModel> MinorTimeHeaderTemplateId(string minorTimeHeaderTemplateId)
        {
            Component.MinorTimeHeaderTemplateId = minorTimeHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The timezone which the scheduler will use to display the scheduler appointment dates. By default the current system timezone is used. This is an acceptable default when the scheduler widget is bound to local array of events. It is advisable to specify a timezone if the scheduler is bound to a remote service. That way all users would see the same dates and times no matter their configured system timezone.
        /// The complete list of the supported timezones is available in the List of IANA time zones Wikipedia page.
        /// </summary>
        /// <param name="timezone">The timezone</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Timezone(&quot;Europe/London&quot;)
        ///     .Height(600)
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
        public SchedulerBuilder<TModel> Timezone(string timezone)
        {
            Component.Timezone = timezone;

            return this;
        }

        /// <summary>
        /// The width of the widget.
        /// </summary>
        /// <param name="width">The width</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Width(800)
        ///     .Height(600)
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
        public SchedulerBuilder<TModel> Width(int width)
        {
            Component.Width = width;

            return this;
        }

        /// <summary>
        /// Sets the editing configuration of the scheduler.
        /// </summary>
        /// <param name="configurator">The lambda which configures the editing</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Editable(editable =&gt;
        ///     {
        ///         editable.Confirmation(false);
        ///         editable.TemplateId(&quot;customEditTemplate&quot;);
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
        public SchedulerBuilder<TModel> Editable(Action<SchedulerEditableSettingsBuilder<TModel>> configurator)
        {
            configurator(new SchedulerEditableSettingsBuilder<TModel>(Component.Editable));

            return this;
        }

        /// <summary>
        /// If set to false the user would not be able to create new scheduler events and modify or delete existing ones.
        /// </summary>
        /// <param name="isEditable">The isEditable</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Editable(false)
        ///     .DataSource(d =&gt; d
        ///         .Model(m =&gt; m.Id(f =&gt; f.TaskID))
        ///             .Read(&quot;Read&quot;, &quot;Scheduler&quot;)
        ///     )
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> Editable(bool isEditable)
        {
            Component.Editable.Enabled = isEditable;
            return this;
        }

        /// <summary>
        /// Sets the resources grouping configuration of the scheduler.
        /// </summary>
        /// <param name="addResourceAction">The lambda which configures the scheduler grouping</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///    .Name(&quot;Scheduler&quot;)
        ///    .Resources(resource =&gt;
        ///    {
        ///        resource.Add(m =&gt; m.TaskID)
        ///            .Title(&quot;Color&quot;)
        ///            .Multiple(true)
        ///            .DataTextField(&quot;Text&quot;)
        ///            .DataValueField(&quot;Value&quot;)
        ///            .DataSource(d =&gt; d.Read(&quot;Attendies&quot;, &quot;Scheduler&quot;));
        ///    })
        ///    .DataSource(dataSource =&gt; dataSource
        ///        .Model(m =&gt; m.Id(f =&gt; f.TaskID))
        ///    ))
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> Group(Action<SchedulerGroupBuilder<TModel>> configucation)
        {
            var factory = new SchedulerGroupBuilder<TModel>(Component);

            configucation(factory);

            return this;
        }

        /// <summary>
        /// Sets the resources configuration of the scheduler.
        /// </summary>
        /// <param name="addResourceAction">The lambda which configures the scheduler resources</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///    .Name(&quot;Scheduler&quot;)
        ///    .Resources(resource =&gt;
        ///    {
        ///        resource.Add(m =&gt; m.TaskID)
        ///            .Title(&quot;Color&quot;)
        ///            .Multiple(true)
        ///            .DataTextField(&quot;Text&quot;)
        ///            .DataValueField(&quot;Value&quot;)
        ///            .DataSource(d =&gt; d.Read(&quot;Attendies&quot;, &quot;Scheduler&quot;));
        ///    })
        ///    .DataSource(dataSource =&gt; dataSource
        ///        .Model(m =&gt; m.Id(f =&gt; f.TaskID))
        ///    ))
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> Resources(Action<SchedulerResourceFactory<TModel>> addResourceAction)
        {
            SchedulerResourceFactory<TModel> factory = new SchedulerResourceFactory<TModel>(Component);

            addResourceAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the views configuration of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler views</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt; {
        ///         views.DayView();
        ///         views.AgendaView();
        ///     })
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> Views(Action<SchedulerViewFactory<TModel>> addViewAction)
        {
            SchedulerViewFactory<TModel> factory = new SchedulerViewFactory<TModel>(Component);

            addViewAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler messages</param>
        public SchedulerBuilder<TModel> Messages(Action<SchedulerMessagesBuilder> addViewAction)
        {
            SchedulerMessagesBuilder builder = new SchedulerMessagesBuilder(Component.Messages);

            addViewAction(builder);

            return this;
        }

        /// <summary>
        /// Sets the events configuration of the scheduler.
        /// </summary>
        /// <param name="clientEventsAction">The lambda which configures the scheduler events</param>
        /// <example>
        /// <code lang="Razor">
        ///  &lt;%= Html.Kendo().Scheduler&lt;Task&gt;()
        ///             .Name(&quot;Scheduler&quot;)
        ///             .Events(events =&gt;
        ///                 events.Remove(&quot;remove&quot;)
        ///             )
        ///             .BindTo(Model)
        /// %&gt;
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> Events(Action<SchedulerEventBuilder> clientEventsAction)
        {
            clientEventsAction(new SchedulerEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Binds the scheduler to a list of objects
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="ASPX">
        /// @model IEnumerable&lt;Task&gt;
        /// &lt;%@Page Inherits=&quot;System.Web.Mvc.ViewPage&lt;IEnumerable&lt;Task&gt;&gt;&quot; %&gt;
        /// &lt;: Html.Kendo().Scheduler&lt;Task&gt;()
        ///    .Name(&quot;Scheduler&quot;)
        ///    .BindTo(Model)
        ///    .DataSource(dataSource =&gt; dataSource
        ///        .Model(m =&gt; m.Id(f =&gt; f.TaskID))
        ///    )&gt;
        /// </code>
         /// <code lang="Razor">
        /// @model IEnumerable&lt;Task&gt;
        /// @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///    .Name(&quot;Scheduler&quot;)
        ///    .BindTo(Model)
        ///    .DataSource(dataSource => dataSource
        ///        .Model(m => m.Id(f => f.TaskID))
        ///    ))
        /// </code>
        /// </example>
        public SchedulerBuilder<TModel> BindTo(IEnumerable<TModel> dataSource)
        {
            Component.DataSource.Data = dataSource;

            return this;
        }
        
        /// <summary>
        /// Configures the DataSource options.
        /// </summary>
        /// <param name="configurator">The DataSource configurator action.</param>
        /// <example>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Scheduler&lt;Task&gt;()
        ///             .Name("Scheduler")
        ///             .DataSource(source =&gt;
        ///             {
        ///                 source.Read(read =&gt;
        ///                 {
        ///                     read.Action("Read", "Scheduler");
        ///                 });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        /// 
        public SchedulerBuilder<TModel> DataSource(Action<AjaxDataSourceBuilder<TModel>> configurator)
        {

            configurator(new AjaxDataSourceBuilder<TModel>(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }

    }
}
