namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableResizeHandlesHoverFillSettings settings.
    /// </summary>
    public class DiagramEditableResizeHandlesHoverFillSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableResizeHandlesHoverFillSettings container;

        public DiagramEditableResizeHandlesHoverFillSettingsBuilder(DiagramEditableResizeHandlesHoverFillSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Set the handles hover fill color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramEditableResizeHandlesHoverFillSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Set the handles hover fill opacity.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public DiagramEditableResizeHandlesHoverFillSettingsBuilder Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        //<< Fields
    }
}

