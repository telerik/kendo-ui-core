namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapMarkersSettings settings.
    /// </summary>
    public class MapMarkersSettingsBuilder: IHideObjectMembers
    {
        private readonly MapMarkersSettings container;

        public MapMarkersSettingsBuilder(MapMarkersSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Kendo UI Tooltip options for this marker.
        /// </summary>
        /// <param name="configurator">The action that configures the tooltip.</param>
        public MapMarkersSettingsBuilder Tooltip(Action<MapMarkersTooltipSettingsBuilder> configurator)
        {
            configurator(new MapMarkersTooltipSettingsBuilder(container.Tooltip));
            return this;
        }
        
        /// <summary>
        /// The marker shape. Supported shapes are "pin" and "pinTarget".
        /// </summary>
        /// <param name="value">The value that configures the shape.</param>
        public MapMarkersSettingsBuilder Shape(MapMarkersShape value)
        {
            container.Shape = value;

            return this;
        }
        
        //<< Fields
    }
}

