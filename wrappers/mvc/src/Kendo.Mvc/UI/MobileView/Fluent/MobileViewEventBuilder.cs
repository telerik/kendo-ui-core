namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileView for ASP.NET MVC events.
    /// </summary>
    public class MobileViewEventBuilder: EventBuilder
    {
        public MobileViewEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires after the mobile View becomes visible. If the view is displayed with transition, the event is triggered after the transition is complete.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the afterShow event.</param>
        public MobileViewEventBuilder AfterShow(string handler)
        {
            Handler("afterShow", handler);

            return this;
        }
        
        /// <summary>
        /// Fires before the mobile View becomes visible. The event can be prevented by calling the preventDefault method of the event parameter, in case a redirection should happen.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the beforeShow event.</param>
        public MobileViewEventBuilder BeforeShow(string handler)
        {
            Handler("beforeShow", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the mobile View becomes hidden.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the hide event.</param>
        public MobileViewEventBuilder Hide(string handler)
        {
            Handler("hide", handler);

            return this;
        }
        
        /// <summary>
        /// Fires after the mobile View and its child widgets are initialized.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the init event.</param>
        public MobileViewEventBuilder Init(string handler)
        {
            Handler("init", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the mobile View becomes visible.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the show event.</param>
        public MobileViewEventBuilder Show(string handler)
        {
            Handler("show", handler);

            return this;
        }
        
        //<< Handlers
    }
}

