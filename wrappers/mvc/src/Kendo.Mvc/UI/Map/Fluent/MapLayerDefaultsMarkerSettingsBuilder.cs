namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerDefaultsMarkerSettings settings.
    /// </summary>
    public class MapLayerDefaultsMarkerSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerDefaultsMarkerSettings container;

        public MapLayerDefaultsMarkerSettingsBuilder(MapLayerDefaultsMarkerSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The the opacity of all marker layers.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public MapLayerDefaultsMarkerSettingsBuilder Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        /// <summary>
        /// The marker shape. Supported shapes are "pin" and "pinTarget".
        /// </summary>
        /// <param name="value">The value that configures the shape.</param>
        public MapLayerDefaultsMarkerSettingsBuilder Shape(MapMarkersShape value)
        {
            container.Shape = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// The marker shape name. The "pin" and "pinTarget" shapes are predefined.
        /// </summary>
        /// <param name="value">The name of the shape.</param>
        public MapLayerDefaultsMarkerSettingsBuilder Shape(string name)
        {
            container.ShapeName = name;

            return this;
        }

        /// <summary>
        /// The tooltip options for this marker.
        /// </summary>
        /// <param name="configurator">The action that configures the tooltip.</param>
        public MapLayerDefaultsMarkerSettingsBuilder Tooltip(Action<MapMarkerTooltipBuilder> configurator)
        {
            configurator(new MapMarkerTooltipBuilder(container.Tooltip));
            return this;
        }
    }
}

