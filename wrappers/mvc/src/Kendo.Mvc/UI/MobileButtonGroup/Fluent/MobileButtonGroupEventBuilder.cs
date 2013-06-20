namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileButtonGroup for ASP.NET MVC events.
    /// </summary>
    public class MobileButtonGroupEventBuilder: EventBuilder
    {
        public MobileButtonGroupEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires when a Button is selected.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the select event.</param>
        public MobileButtonGroupEventBuilder Select(string handler)
        {
            Handler("select", handler);

            return this;
        }
        
        //<< Handlers
    }
}

