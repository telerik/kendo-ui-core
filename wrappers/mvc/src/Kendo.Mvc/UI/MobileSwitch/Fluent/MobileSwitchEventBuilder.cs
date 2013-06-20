namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileSwitch for ASP.NET MVC events.
    /// </summary>
    public class MobileSwitchEventBuilder: EventBuilder
    {
        public MobileSwitchEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires when the state of the widget changes
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public MobileSwitchEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
        
        //<< Handlers
    }
}

