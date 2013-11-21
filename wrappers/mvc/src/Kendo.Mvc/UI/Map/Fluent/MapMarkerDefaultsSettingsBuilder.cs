namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapMarkerDefaultsSettings settings.
    /// </summary>
    public class MapMarkerDefaultsSettingsBuilder: IHideObjectMembers
    {
        private readonly MapMarkerDefaultsSettings container;

        public MapMarkerDefaultsSettingsBuilder(MapMarkerDefaultsSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The default marker shape. The following pre-defined marker shapes are available:Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
		/// For example "pinTarget" is rendered as "k-marker-pin-target".
        /// </summary>
        /// <param name="value">The value that configures the shape.</param>
        public MapMarkerDefaultsSettingsBuilder Shape(string value)
        {
            container.Shape = value;

            return this;
        }
        
        /// <summary>
        /// Default Kendo UI Tooltip options for this marker.
        /// </summary>
        /// <param name="configurator">The action that configures the tooltip.</param>
        public MapMarkerDefaultsSettingsBuilder Tooltip(Action<MapMarkerDefaultsTooltipSettingsBuilder> configurator)
        {
            configurator(new MapMarkerDefaultsTooltipSettingsBuilder(container.Tooltip));
            return this;
        }
        
        //<< Fields

        
    }
}

