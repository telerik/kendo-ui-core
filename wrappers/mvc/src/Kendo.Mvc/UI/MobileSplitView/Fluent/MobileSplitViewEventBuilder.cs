namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileSplitView for ASP.NET MVC events.
    /// </summary>
    public class MobileSplitViewEventBuilder: EventBuilder
    {
        public MobileSplitViewEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires after the mobile SplitView and its child widgets are initialized.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the init event.</param>
        public MobileSplitViewEventBuilder Init(string handler)
        {
            Handler("init", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the mobile SplitView becomes visible.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the show event.</param>
        public MobileSplitViewEventBuilder Show(string handler)
        {
            Handler("show", handler);

            return this;
        }
        
        //<< Handlers
    }
}

