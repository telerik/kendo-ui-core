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
        /// The default marker shape for all marker layers. The following pre-defined marker shapes are available:Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
		/// For example "pinTarget" is rendered as "k-marker-pin-target".
        /// </summary>
        /// <param name="value">The value that configures the shape.</param>
        public MapLayerDefaultsMarkerSettingsBuilder Shape(string value)
        {
            container.Shape = value;

            return this;
        }
        
        /// <summary>
        /// The the opacity of all marker layers.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public MapLayerDefaultsMarkerSettingsBuilder Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        //<< Fields
    }
}

