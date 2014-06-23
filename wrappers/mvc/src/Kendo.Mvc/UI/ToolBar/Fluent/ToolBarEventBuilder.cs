namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo ToolBar for ASP.NET MVC events.
    /// </summary>
    public class ToolBarEventBuilder: EventBuilder
    {
        public ToolBarEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires when the user clicks a command button.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the click event.</param>
        public ToolBarEventBuilder Click(string handler)
        {
            Handler("click", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the SplitButton's popup closes.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the close event.</param>
        public ToolBarEventBuilder Close(string handler)
        {
            Handler("close", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the Split Button's popup opens.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the open event.</param>
        public ToolBarEventBuilder Open(string handler)
        {
            Handler("open", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the user changes the checked state of a toggle button.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the toggle event.</param>
        public ToolBarEventBuilder Toggle(string handler)
        {
            Handler("toggle", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the overflow popup container is about to close.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the overflowClose event.</param>
        public ToolBarEventBuilder OverflowClose(string handler)
        {
            Handler("overflowClose", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the overflow popup container is about to open.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the overflowOpen event.</param>
        public ToolBarEventBuilder OverflowOpen(string handler)
        {
            Handler("overflowOpen", handler);

            return this;
        }
        
        //<< Handlers
    }
}

