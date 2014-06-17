namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerDefaultsBubbleStyleSettings settings.
    /// </summary>
    public class MapLayerDefaultsBubbleStyleSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerDefaultsBubbleStyleSettings container;

        public MapLayerDefaultsBubbleStyleSettingsBuilder(MapLayerDefaultsBubbleStyleSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The default fill for bubble layer symbols.
		/// Accepts a valid CSS color string or object with detailed configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public MapLayerDefaultsBubbleStyleSettingsBuilder Fill(Action<MapLayerDefaultsBubbleStyleFillSettingsBuilder> configurator)
        {
            configurator(new MapLayerDefaultsBubbleStyleFillSettingsBuilder(container.Fill));
            return this;
        }
        
        /// <summary>
        /// The default stroke for bubble layer symbols.
		/// Accepts a valid CSS color string or object with detailed configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public MapLayerDefaultsBubbleStyleSettingsBuilder Stroke(Action<MapLayerDefaultsBubbleStyleStrokeSettingsBuilder> configurator)
        {
            configurator(new MapLayerDefaultsBubbleStyleStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

