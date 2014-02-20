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
        /// The marker location on the map. Coordinates are listed as [Latitude, Longitude].
        /// </summary>
        /// <param name="value">The value that configures the location.</param>
        public MapMarkerBuilder Location(params double[] value)
        {
            container.Location = value;

            return this;
        }
        
        /// <summary>
        /// The marker title. Displayed as browser tooltip.
        /// </summary>
        /// <param name="value">The value that configures the title.</param>
        public MapMarkerBuilder Title(string value)
        {
            container.Title = value;

            return this;
        }
        
        /// <summary>
        /// The marker shape. Supported shapes are "pin" and "pinTarget".
        /// </summary>
        /// <param name="value">The value that configures the shape.</param>
        public MapMarkerBuilder Shape(MapMarkersShape value)
        {
            container.Shape = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// The marker shape name. The "pin" and "pinTarget" shapes are predefined.
        /// </summary>
        /// <param name="value">The name of the shape.</param>
        public MapMarkerBuilder Shape(string name)
        {
            container.ShapeName = name;

            return this;
        }

        /// <summary>
        /// The tooltip options for this marker.
        /// </summary>
        /// <param name="configurator">The action that configures the tooltip.</param>
        public MapMarkerBuilder Tooltip(Action<MapMarkerTooltipBuilder> configurator)
        {
            configurator(new MapMarkerTooltipBuilder(container.Tooltip));
            return this;
        }
        
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

