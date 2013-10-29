namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Map for ASP.NET MVC events.
    /// </summary>
    public class MapEventBuilder: EventBuilder
    {
        public MapEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fired when the user clicks on the map.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the click event.</param>
        public MapEventBuilder Click(string handler)
        {
            Handler("click", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the map is reset, e.g. on initial load or during zoom.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the reset event.</param>
        public MapEventBuilder Reset(string handler)
        {
            Handler("reset", handler);

            return this;
        }
        
        /// <summary>
        /// Fired while the map viewport is being moved.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the pan event.</param>
        public MapEventBuilder Pan(string handler)
        {
            Handler("pan", handler);

            return this;
        }
        
        /// <summary>
        /// Fires after the map viewport has been moved.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the panEnd event.</param>
        public MapEventBuilder PanEnd(string handler)
        {
            Handler("panEnd", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when a shape is clicked or tapped.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the shapeClick event.</param>
        public MapEventBuilder ShapeClick(string handler)
        {
            Handler("shapeClick", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when a shape is created, but is not rendered yet.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the shapeCreated event.</param>
        public MapEventBuilder ShapeCreated(string handler)
        {
            Handler("shapeCreated", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the mouse enters a shape.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the shapeMouseEnter event.</param>
        public MapEventBuilder ShapeMouseEnter(string handler)
        {
            Handler("shapeMouseEnter", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the mouse leaves a shape.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the shapeMouseLeave event.</param>
        public MapEventBuilder ShapeMouseLeave(string handler)
        {
            Handler("shapeMouseLeave", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the map zoom level is about to change.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the zoomStart event.</param>
        public MapEventBuilder ZoomStart(string handler)
        {
            Handler("zoomStart", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the map zoom level has changed.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the zoomEnd event.</param>
        public MapEventBuilder ZoomEnd(string handler)
        {
            Handler("zoomEnd", handler);

            return this;
        }
        
        //<< Handlers
    }
}

