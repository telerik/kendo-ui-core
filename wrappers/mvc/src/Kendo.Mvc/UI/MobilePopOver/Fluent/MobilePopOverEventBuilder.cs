namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobilePopOver for ASP.NET MVC events.
    /// </summary>
    public class MobilePopOverEventBuilder: EventBuilder
    {
        public MobilePopOverEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires when popover is closed.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the close event.</param>
        public MobilePopOverEventBuilder Close(string handler)
        {
            Handler("close", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when popover is opened.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the open event.</param>
        public MobilePopOverEventBuilder Open(string handler)
        {
            Handler("open", handler);

            return this;
        }
        
        //<< Handlers
    }
}

