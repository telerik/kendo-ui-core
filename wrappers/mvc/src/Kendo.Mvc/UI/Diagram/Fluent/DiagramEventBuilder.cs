namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Diagram for ASP.NET MVC events.
    /// </summary>
    public class DiagramEventBuilder: EventBuilder
    {
        public DiagramEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fired when an item is added or removed to/from the diagram.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public DiagramEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the bounds of an item are changed.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the itemBoundsChange event.</param>
        public DiagramEventBuilder ItemBoundsChange(string handler)
        {
            Handler("itemBoundsChange", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when an item is rotated.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the itemRotate event.</param>
        public DiagramEventBuilder ItemRotate(string handler)
        {
            Handler("itemRotate", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user pans the diagram.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the pan event.</param>
        public DiagramEventBuilder Pan(string handler)
        {
            Handler("pan", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user selects one or more items.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the select event.</param>
        public DiagramEventBuilder Select(string handler)
        {
            Handler("select", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user changes the diagram zoom level.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the zoom event.</param>
        public DiagramEventBuilder Zoom(string handler)
        {
            Handler("zoom", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user clicks on a shape or a connection. Will not fire when the start/down and end/up event points are not equal.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the click event.</param>
        public DiagramEventBuilder Click(string handler)
        {
            Handler("click", handler);

            return this;
        }
        
        //<< Handlers
    }
}

