namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo TreeMap for ASP.NET MVC events.
    /// </summary>
    public class TreeMapEventBuilder: EventBuilder
    {
        public TreeMapEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fired when a tile has been created.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the itemCreated event.</param>
        public TreeMapEventBuilder ItemCreated(string handler)
        {
            Handler("itemCreated", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the widget is bound to data from its dataSource.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBound event.</param>
        public TreeMapEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }
        
        //<< Handlers
    }
}

