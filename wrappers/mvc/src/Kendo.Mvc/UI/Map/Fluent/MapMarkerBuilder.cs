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
        /// The initial markers to display on the map.
        /// </summary>
        /// <param name="configurator">The action that configures the marker.</param>
        public MapMarkerBuilder Marker(Action<MapMarkerBuilder> configurator)
        {
            configurator(new MapMarkerBuilder(container.Marker));
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

