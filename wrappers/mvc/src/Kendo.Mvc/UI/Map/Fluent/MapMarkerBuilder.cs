namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapMarker settings.
    /// </summary>
    public class MapMarkerBuilder: IHideObjectMembers
    {
        private readonly MapMarker container;

        public MapMarkerBuilder(MapMarker settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The marker color. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public MapMarkerBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// The marker size in pixels.
        /// </summary>
        /// <param name="value">The value that configures the size.</param>
        public MapMarkerBuilder Size(double value)
        {
            container.Size = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the shape.</param>
        public MapMarkerBuilder Shape(MapMarkerShape value)
        {
            container.Shape = value;

            return this;
        }
        
        //<< Fields

        
        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MapMarkerBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MapMarkerBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {

            container.HtmlAttributes.Clear();
            container.HtmlAttributes.Merge(attributes);

            return this;
        }
        
    }
}

