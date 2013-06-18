namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileDrawer for ASP.NET MVC events.
    /// </summary>
    public class MobileDrawerEventBuilder: EventBuilder
    {
        public MobileDrawerEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires before the mobile Drawer is revealed. The event can be prevented by calling the preventDefault method of the event parameter.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the beforeShow event.</param>
        public MobileDrawerEventBuilder BeforeShow(string handler)
        {
            Handler("before-show", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the mobile Drawer is closed by the user.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the hide event.</param>
        public MobileDrawerEventBuilder Hide(string handler)
        {
            Handler("hide", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the mobile Drawer and its child widgets are initialized.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the init event.</param>
        public MobileDrawerEventBuilder Init(string handler)
        {
            Handler("init", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the Drawer is shown.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the show event.</param>
        public MobileDrawerEventBuilder Show(string handler)
        {
            Handler("show", handler);

            return this;
        }
        
        //<< Handlers
    }
}

