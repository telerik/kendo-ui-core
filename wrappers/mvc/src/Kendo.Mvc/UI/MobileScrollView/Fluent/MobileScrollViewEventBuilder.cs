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
        /// Fires before the widget page is changed. The change can be prevented by calling the preventDefault method of the event parameter, in which case the widget will snap back to the current page.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the changing event.</param>
        public MobileScrollViewEventBuilder Changing(string handler)
        {
            Handler("changing", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the widget page is changed.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public MobileScrollViewEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when widget refreshes
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the refresh event.</param>
        public MobileScrollViewEventBuilder Refresh(string handler)
        {
            Handler("refresh", handler);

            return this;
        }
        
        //<< Handlers
    }
}

