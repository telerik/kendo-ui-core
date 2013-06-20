namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileModalView for ASP.NET MVC events.
    /// </summary>
    public class MobileModalViewEventBuilder: EventBuilder
    {
        public MobileModalViewEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fired when the mobile ModalView is closed by the user.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the close event.</param>
        public MobileModalViewEventBuilder Close(string handler)
        {
            Handler("close", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the mobile ModalView and its child widgets are initialized.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the init event.</param>
        public MobileModalViewEventBuilder Init(string handler)
        {
            Handler("init", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the ModalView is shown.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the open event.</param>
        public MobileModalViewEventBuilder Open(string handler)
        {
            Handler("open", handler);

            return this;
        }
        
        //<< Handlers
    }
}

