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
        /// The copyright message for all shape layers.
        /// </summary>
        /// <param name="value">The value that configures the copyright.</param>
        public MapLayerDefaultsShapeSettingsBuilder Copyright(string value)
        {
            container.Copyright = value;

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

