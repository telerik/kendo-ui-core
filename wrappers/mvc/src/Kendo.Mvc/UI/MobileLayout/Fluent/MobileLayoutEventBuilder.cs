namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileLayout for ASP.NET MVC events.
    /// </summary>
    public class MobileLayoutEventBuilder: EventBuilder
    {
        public MobileLayoutEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires when a mobile View using the layout becomes hidden.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the hide event.</param>
        public MobileLayoutEventBuilder Hide(string handler)
        {
            Handler("hide", handler);

            return this;
        }
        
        /// <summary>
        /// Fires after a mobile Layout and its child widgets is initialized.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the init event.</param>
        public MobileLayoutEventBuilder Init(string handler)
        {
            Handler("init", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when a mobile View using the layout becomes visible.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the show event.</param>
        public MobileLayoutEventBuilder Show(string handler)
        {
            Handler("show", handler);

            return this;
        }
        
        //<< Handlers
    }
}

