namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerDefaultsBubbleStyleStrokeSettings settings.
    /// </summary>
    public class MapLayerDefaultsBubbleStyleStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerDefaultsBubbleStyleStrokeSettings container;

        public MapLayerDefaultsBubbleStyleStrokeSettingsBuilder(MapLayerDefaultsBubbleStyleStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The default stroke color for bubble layer symbols.
		/// Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public MapLayerDefaultsBubbleStyleStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// The default dash type for layer symbols.
		/// The following dash types are supported:
        /// </summary>
        /// <param name="value">The value that configures the dashtype.</param>
        public MapLayerDefaultsBubbleStyleStrokeSettingsBuilder DashType(string value)
        {
            container.DashType = value;

            return this;
        }
        
        /// <summary>
        /// The default stroke opacity (0 to 1) for bubble layer symbols.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public MapLayerDefaultsBubbleStyleStrokeSettingsBuilder Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        /// <summary>
        /// The default stroke width for bubble layer symbols.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public MapLayerDefaultsBubbleStyleStrokeSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        //<< Fields
    }
}

