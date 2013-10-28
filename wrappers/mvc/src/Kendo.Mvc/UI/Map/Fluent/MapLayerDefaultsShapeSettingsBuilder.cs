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
        /// The default fill for layer shapes.
		/// Accepts a valid CSS color string or object with detailed configuration.
        /// </summary>
        /// <param name="value">The value that configures the fill.</param>
        public MapLayerDefaultsShapeSettingsBuilder Fill(string value)
        {
            container.Fill = value;

            return this;
        }
        
        /// <summary>
        /// The default stroke for layer shapes.
		/// Accepts a valid CSS color string or object with detailed configuration.
        /// </summary>
        /// <param name="value">The value that configures the stroke.</param>
        public MapLayerDefaultsShapeSettingsBuilder Stroke(string value)
        {
            container.Stroke = value;

            return this;
        }
        
        //<< Fields

        
    }
}

