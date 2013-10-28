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
        /// Fired when a marker is created, but is not rendered yet.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the markerCreated event.</param>
        public MapEventBuilder MarkerCreated(string handler)
        {
            Handler("markerCreated", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when a marker is hovered.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the markerHover event.</param>
        public MapEventBuilder MarkerHover(string handler)
        {
            Handler("markerHover", handler);

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
        /// Fired when a shape is hovered.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the shapeHover event.</param>
        public MapEventBuilder ShapeHover(string handler)
        {
            Handler("shapeHover", handler);

            return this;
        }
        
        //<< Handlers
    }
}

