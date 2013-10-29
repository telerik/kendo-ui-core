namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerDefaultsShapeStyleSettings settings.
    /// </summary>
    public class MapLayerDefaultsShapeStyleSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerDefaultsShapeStyleSettings container;

        public MapLayerDefaultsShapeStyleSettingsBuilder(MapLayerDefaultsShapeStyleSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The default fill for layer shapes.
		/// Accepts a valid CSS color string or object with detailed configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public MapLayerDefaultsShapeStyleSettingsBuilder Fill(Action<MapLayerDefaultsShapeStyleFillSettingsBuilder> configurator)
        {
            configurator(new MapLayerDefaultsShapeStyleFillSettingsBuilder(container.Fill));
            return this;
        }
        
        /// <summary>
        /// The default stroke for layer shapes.
		/// Accepts a valid CSS color string or object with detailed configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public MapLayerDefaultsShapeStyleSettingsBuilder Stroke(Action<MapLayerDefaultsShapeStyleStrokeSettingsBuilder> configurator)
        {
            configurator(new MapLayerDefaultsShapeStyleStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

