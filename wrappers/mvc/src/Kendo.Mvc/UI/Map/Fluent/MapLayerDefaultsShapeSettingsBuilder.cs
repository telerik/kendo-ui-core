namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerDefaultsShapeSettings settings.
    /// </summary>
    public class MapLayerDefaultsShapeSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerDefaultsShapeSettings container;

        public MapLayerDefaultsShapeSettingsBuilder(MapLayerDefaultsShapeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The attribution for all shape layers.
        /// </summary>
        /// <param name="value">The value that configures the attribution.</param>
        public MapLayerDefaultsShapeSettingsBuilder Attribution(string value)
        {
            container.Attribution = value;

            return this;
        }
        
        /// <summary>
        /// The default style for shapes.
        /// </summary>
        /// <param name="configurator">The action that configures the style.</param>
        public MapLayerDefaultsShapeSettingsBuilder Style(Action<MapLayerDefaultsShapeStyleSettingsBuilder> configurator)
        {
            configurator(new MapLayerDefaultsShapeStyleSettingsBuilder(container.Style));
            return this;
        }
        
        //<< Fields

        
    }
}

