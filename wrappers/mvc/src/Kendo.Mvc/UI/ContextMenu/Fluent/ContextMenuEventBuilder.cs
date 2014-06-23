namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo ContextMenu for ASP.NET MVC events.
    /// </summary>
    public class ContextMenuEventBuilder: EventBuilder
    {
        public ContextMenuEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires before a sub menu or the ContextMenu gets closed. You can cancel this event to prevent closure.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the close event.</param>
        public ContextMenuEventBuilder Close(string handler)
        {
            Handler("close", handler);

            return this;
        }
        
        /// <summary>
        /// Fires before a sub menu or the ContextMenu gets opened. You can cancel this event to prevent opening the sub menu.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the open event.</param>
        public ContextMenuEventBuilder Open(string handler)
        {
            Handler("open", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when a sub menu or the ContextMenu gets opened and its animation finished.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the activate event.</param>
        public ContextMenuEventBuilder Activate(string handler)
        {
            Handler("activate", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when a sub menu or the ContextMenu gets closed and its animation finished.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the deactivate event.</param>
        public ContextMenuEventBuilder Deactivate(string handler)
        {
            Handler("deactivate", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when a menu item gets selected.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the select event.</param>
        public ContextMenuEventBuilder Select(string handler)
        {
            Handler("select", handler);

            return this;
        }
        
        //<< Handlers
    }
}

