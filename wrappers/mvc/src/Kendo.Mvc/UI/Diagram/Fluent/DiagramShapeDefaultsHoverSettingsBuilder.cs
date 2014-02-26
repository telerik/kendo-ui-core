namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsHoverSettings settings.
    /// </summary>
    public class DiagramShapeDefaultsHoverSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeDefaultsHoverSettings container;

        public DiagramShapeDefaultsHoverSettingsBuilder(DiagramShapeDefaultsHoverSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Hover's background color.
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public DiagramShapeDefaultsHoverSettingsBuilder Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        //<< Fields
    }
}

