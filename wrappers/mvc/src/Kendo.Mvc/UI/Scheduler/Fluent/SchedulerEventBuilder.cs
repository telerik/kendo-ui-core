namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// The fluent API for subscribing to Kendo UI Scheduler events.
    /// </summary>
    public class SchedulerEventBuilder : EventBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerEventBuilder"/> class.
        /// </summary>
        /// <param name="events">The events.</param>
        public SchedulerEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the remove event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler()
        ///            .Name("Scheduler")
        ///            .DataSource(d => d
        ///                 .Model(m => m.Id(f => f.TaskID))
        ///                     .Read("Read", "Scheduler")
        ///                     .Create("Create", "Scheduler")
        ///                     .Destroy("Destroy", "Scheduler")
        ///                     .Update("Update", "Scheduler")
        ///             )  
        ///            .Events(events => events.Remove(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder Remove(Func<object, object> handler)
        {
            Handler("remove", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the remove event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler()
        ///             .Name("Scheduler")
        ///             .Events(events => events.Remove("remove"))
        ///             .DataSource(d => d
        ///                 .Model(m => m.Id(f => f.TaskID))
        ///                     .Read("Read", "Scheduler")
        ///                     .Create("Create", "Scheduler")
        ///                     .Destroy("Destroy", "Scheduler")
        ///                     .Update("Update", "Scheduler")
        ///             )  
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder Remove(string handler)
        {
            Handler("remove", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the edit event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler()
        ///            .Name("Scheduler")
        ///            .DataSource(d => d
        ///                 .Model(m => m.Id(f => f.TaskID))
        ///                     .Read("Read", "Scheduler")
        ///                     .Create("Create", "Scheduler")
        ///                     .Destroy("Destroy", "Scheduler")
        ///                     .Update("Update", "Scheduler")
        ///             )  
        ///            .Events(events => events.Edit(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder Edit(Func<object, object> handler)
        {
            Handler("edit", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the edit event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///             .Name("Scheduler")
        ///             .Events(events => events.Edit("edit"))
        ///             .DataSource(d => d
        ///                 .Model(m => m.Id(f => f.TaskID))
        ///                     .Read("Read", "Scheduler")
        ///                     .Create("Create", "Scheduler")
        ///                     .Destroy("Destroy", "Scheduler")
        ///                     .Update("Update", "Scheduler")
        ///             )  
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder Edit(string handler)
        {
            Handler("edit", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the cancel event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///            .Name("Scheduler")
        ///            .DataSource(d => d
        ///                 .Model(m => m.Id(f => f.TaskID))
        ///                     .Read("Read", "Scheduler")
        ///                     .Create("Create", "Scheduler")
        ///                     .Destroy("Destroy", "Scheduler")
        ///                     .Update("Update", "Scheduler")
        ///             )  
        ///            .Events(events => events.Cancel(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder Cancel(Func<object, object> handler)
        {
            Handler("cancel", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the cancel event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///             .Name("Scheduler")
        ///             .Events(events => events.Cancel("cancel"))
        ///             .DataSource(d => d
        ///                 .Model(m => m.Id(f => f.TaskID))
        ///                     .Read("Read", "Scheduler")
        ///                     .Create("Create", "Scheduler")
        ///                     .Destroy("Destroy", "Scheduler")
        ///                     .Update("Update", "Scheduler")
        ///             )  
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder Cancel(string handler)
        {
            Handler("cancel", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the save event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///            .Name("Scheduler")
        ///            .Events(events => events.Save(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .DataSource(d => d
        ///                 .Model(m => m.Id(f => f.TaskID))
        ///                     .Read("Read", "Scheduler")
        ///                     .Create("Create", "Scheduler")
        ///                     .Destroy("Destroy", "Scheduler")
        ///                     .Update("Update", "Scheduler")
        ///             )            
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder Save(Func<object, object> handler)
        {
            Handler("save", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the save event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///             .Name("Scheduler")
        ///             .Events(events => events.Save("save"))
        ///             .DataSource(d => d
	    ///                 .Model(m => m.Id(f => f.TaskID))
		///                     .Read("Read", "Scheduler")
		///                     .Create("Create", "Scheduler")
		///                     .Destroy("Destroy", "Scheduler")
		///                     .Update("Update", "Scheduler")
        ///             )  
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder Save(string handler)
        {
            Handler("save", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the dataBound event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///            .Name("Scheduler")
        ///            .DataSource(d => d
        ///                 .Model(m => m.Id(f => f.TaskID))
        ///                     .Read("Read", "Scheduler")
        ///                     .Create("Create", "Scheduler")
        ///                     .Destroy("Destroy", "Scheduler")
        ///                     .Update("Update", "Scheduler")
        ///             )  
        ///            .Events(events => events.DataBound(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder DataBound(Func<object, object> handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the dataBound event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///             .Name("Scheduler")
        ///             .Events(events => events.DataBound("dataBound"))
        ///             .DataSource(d => d
        ///                 .Model(m => m.Id(f => f.TaskID))
        ///                     .Read("Read", "Scheduler")
        ///                     .Create("Create", "Scheduler")
        ///                     .Destroy("Destroy", "Scheduler")
        ///                     .Update("Update", "Scheduler")
        ///             )  
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the dataBinding event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///            .Name("Scheduler")
        ///            .DataSource(d => d
        ///                 .Model(m => m.Id(f => f.TaskID))
        ///                     .Read("Read", "Scheduler")
        ///                     .Create("Create", "Scheduler")
        ///                     .Destroy("Destroy", "Scheduler")
        ///                     .Update("Update", "Scheduler")
        ///             )  
        ///            .Events(events => events.DataBinding(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder DataBinding(Func<object, object> handler)
        {
            Handler("dataBinding", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the dataBinding event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///             .Name("Scheduler")
        ///             .Events(events => events.DataBinding("dataBinding"))
        ///             .DataSource(d => d
        ///                 .Model(m => m.Id(f => f.TaskID))
        ///                     .Read("Read", "Scheduler")
        ///                     .Create("Create", "Scheduler")
        ///                     .Destroy("Destroy", "Scheduler")
        ///                     .Update("Update", "Scheduler")
        ///             )  
        /// )
        /// </code>
        /// </example>
        public SchedulerEventBuilder DataBinding(string handler)
        {
            Handler("dataBinding", handler);

            return this;
        }
    }
}
