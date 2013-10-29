namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerStyleFillSettings settings.
    /// </summary>
    public class MapLayerStyleFillSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerStyleFillSettings container;

        public MapLayerStyleFillSettingsBuilder(MapLayerStyleFillSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The default fill color for layer shapes.
		/// Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public MapLayerStyleFillSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// The default fill opacity (0 to 1) for layer shapes.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public MapLayerStyleFillSettingsBuilder Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        //<< Fields
    }
}

