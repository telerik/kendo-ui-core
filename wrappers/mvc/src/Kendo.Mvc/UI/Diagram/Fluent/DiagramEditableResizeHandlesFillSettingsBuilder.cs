namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableResizeHandlesFillSettings settings.
    /// </summary>
    public class DiagramEditableResizeHandlesFillSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableResizeHandlesFillSettings container;

        public DiagramEditableResizeHandlesFillSettingsBuilder(DiagramEditableResizeHandlesFillSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the handles fill color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramEditableResizeHandlesFillSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the handles fill opacity.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public DiagramEditableResizeHandlesFillSettingsBuilder Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        //<< Fields
    }
}

