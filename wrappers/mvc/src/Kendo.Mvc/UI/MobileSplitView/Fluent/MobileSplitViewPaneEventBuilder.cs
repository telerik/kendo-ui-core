namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileSplitViewPane for ASP.NET MVC events.
    /// </summary>
    public class MobileSplitViewPaneEventBuilder : EventBuilder
    {
        public MobileSplitViewPaneEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers

        /// <summary>
        /// Triggered when pane navigates to a view.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the navigate event.</param>
        public MobileSplitViewPaneEventBuilder Navigate(string handler)
        {
            Handler("navigate", handler);

            return this;
        }

        /// <summary>
        /// Triggered after the pane displays a view.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the viewShow event.</param>
        public MobileSplitViewPaneEventBuilder ViewShow(string handler)
        {
            Handler("view-show", handler);

            return this;
        }

        //<< Handlers
    }
}

