namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerStyleSettings settings.
    /// </summary>
    public class MapLayerStyleSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerStyleSettings container;

        public MapLayerStyleSettingsBuilder(MapLayerStyleSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The default fill for layer shapes.
		/// Accepts a valid CSS color string or object with detailed configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public MapLayerStyleSettingsBuilder Fill(Action<MapLayerStyleFillSettingsBuilder> configurator)
        {
            configurator(new MapLayerStyleFillSettingsBuilder(container.Fill));
            return this;
        }
        
        /// <summary>
        /// The default stroke for layer shapes.
		/// Accepts a valid CSS color string or object with detailed configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public MapLayerStyleSettingsBuilder Stroke(Action<MapLayerStyleStrokeSettingsBuilder> configurator)
        {
            configurator(new MapLayerStyleStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

