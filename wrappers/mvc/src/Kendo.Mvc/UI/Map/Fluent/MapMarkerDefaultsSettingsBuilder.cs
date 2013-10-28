namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapMarkerDefaultsSettings settings.
    /// </summary>
    public class MapMarkerDefaultsSettingsBuilder: IHideObjectMembers
    {
        private readonly MapMarkerDefaultsSettings container;

        public MapMarkerDefaultsSettingsBuilder(MapMarkerDefaultsSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The default marker color. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public MapMarkerDefaultsSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// The default marker size in pixels.
        /// </summary>
        /// <param name="value">The value that configures the size.</param>
        public MapMarkerDefaultsSettingsBuilder Size(int value)
        {
            container.Size = value;

            return this;
        }
        
        /// <summary>
        /// The default marker shape. Supported shapes:
        /// </summary>
        /// <param name="value">The value that configures the shape.</param>
        public MapMarkerDefaultsSettingsBuilder Shape(string value)
        {
            container.Shape = value;

            return this;
        }
        
        //<< Fields

        
    }
}

