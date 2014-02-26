namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeHoverSettings settings.
    /// </summary>
    public class DiagramShapeHoverSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeHoverSettings container;

        public DiagramShapeHoverSettingsBuilder(DiagramShapeHoverSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Hover's background color.
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public DiagramShapeHoverSettingsBuilder Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        //<< Fields
    }
}

