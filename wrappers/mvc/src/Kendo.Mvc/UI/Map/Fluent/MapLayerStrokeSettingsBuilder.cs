namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerStrokeSettings settings.
    /// </summary>
    public class MapLayerStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerStrokeSettings container;

        public MapLayerStrokeSettingsBuilder(MapLayerStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The default stroke color for layer shapes.
		/// Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public MapLayerStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// The default stroke opacity (0 to 1) for layer shapes.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public MapLayerStrokeSettingsBuilder Opacity(int value)
        {
            container.Opacity = value;

            return this;
        }
        
        //<< Fields

        
    }
}

