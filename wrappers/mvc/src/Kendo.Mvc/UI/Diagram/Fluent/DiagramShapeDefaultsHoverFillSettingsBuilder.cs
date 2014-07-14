namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsHoverFillSettings settings.
    /// </summary>
    public class DiagramShapeDefaultsHoverFillSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeDefaultsHoverFillSettings container;

        public DiagramShapeDefaultsHoverFillSettingsBuilder(DiagramShapeDefaultsHoverFillSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Hover's fill color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramShapeDefaultsHoverFillSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Hover's fill opacity.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public DiagramShapeDefaultsHoverFillSettingsBuilder Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        //<< Fields
    }
}

