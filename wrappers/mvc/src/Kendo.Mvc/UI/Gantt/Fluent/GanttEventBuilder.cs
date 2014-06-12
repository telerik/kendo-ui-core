namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Gantt for ASP.NET MVC events.
    /// </summary>
    public class GanttEventBuilder: EventBuilder
    {
        public GanttEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fired before the widget binds to its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBinding event.</param>
        public GanttEventBuilder DataBinding(string handler)
        {
            Handler("dataBinding", handler);

            return this;
        }
        
        //<< Handlers
    }
}

