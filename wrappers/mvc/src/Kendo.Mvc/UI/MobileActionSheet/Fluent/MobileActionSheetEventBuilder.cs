namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileActionSheet for ASP.NET MVC events.
    /// </summary>
    public class MobileActionSheetEventBuilder: EventBuilder
    {
        public MobileActionSheetEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires when the ActionSheet is opened.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the open event.</param>
        public MobileActionSheetEventBuilder Open(string handler)
        {
            Handler("open", handler);

            return this;
        }
        
        //<< Handlers
    }
}

