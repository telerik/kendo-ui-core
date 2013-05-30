namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileScrollView for ASP.NET MVC events.
    /// </summary>
    public class MobileScrollViewEventBuilder: EventBuilder
    {
        public MobileScrollViewEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires when the widget page is changed.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public MobileScrollViewEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
        
        //<< Handlers
    }
}

