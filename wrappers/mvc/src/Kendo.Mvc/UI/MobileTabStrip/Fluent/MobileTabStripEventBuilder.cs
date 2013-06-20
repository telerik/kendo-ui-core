namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileTabStrip for ASP.NET MVC events.
    /// </summary>
    public class MobileTabStripEventBuilder: EventBuilder
    {
        public MobileTabStripEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires when tab is selected.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the select event.</param>
        public MobileTabStripEventBuilder Select(string handler)
        {
            Handler("select", handler);

            return this;
        }
        
        //<< Handlers
    }
}

