namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileApplication for ASP.NET MVC events.
    /// </summary>
    public class MobileApplicationEventBuilder: EventBuilder
    {
        public MobileApplicationEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires after the mobile application is instantiated.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the init event.</param>
        public MobileApplicationEventBuilder Init(string handler)
        {
            Handler("init", handler);

            return this;
        }
        
        //<< Handlers
    }
}

