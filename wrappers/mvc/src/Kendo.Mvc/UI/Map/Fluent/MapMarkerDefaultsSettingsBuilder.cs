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
        /// The default marker shape. Supported shapes are "pin" and "pinTarget".
        /// </summary>
        /// <param name="value">The value that configures the shape.</param>
        public MapMarkerDefaultsSettingsBuilder Shape(MapMarkersShape value)
        {
            container.Shape = value;

            return this;
        }

        //<< Fields   

        /// <summary>
        /// The marker shape name. The "pin" and "pinTarget" shapes are predefined.
        /// </summary>
        /// <param name="value">The name of the shape.</param>
        public MapMarkerDefaultsSettingsBuilder Shape(string name)
        {
            container.ShapeName = name;

            return this;
        }

        /// <summary>
        /// Default Kendo UI Tooltip options for this marker.
        /// </summary>
        /// <param name="configurator">The action that configures the tooltip.</param>
        public MapMarkerDefaultsSettingsBuilder Tooltip(Action<MapMarkerTooltipBuilder> configurator)
        {
            configurator(new MapMarkerTooltipBuilder(container.Tooltip));
            return this;
        }     
    }
}

