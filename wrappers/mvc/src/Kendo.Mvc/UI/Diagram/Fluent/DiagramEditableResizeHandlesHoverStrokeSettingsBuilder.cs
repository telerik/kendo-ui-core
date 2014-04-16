namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableResizeHandlesHoverStrokeSettings settings.
    /// </summary>
    public class DiagramEditableResizeHandlesHoverStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableResizeHandlesHoverStrokeSettings container;

        public DiagramEditableResizeHandlesHoverStrokeSettingsBuilder(DiagramEditableResizeHandlesHoverStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the handles stroke color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramEditableResizeHandlesHoverStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the handles stroke width.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramEditableResizeHandlesHoverStrokeSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the handles stroke dash type.
        /// </summary>
        /// <param name="value">The value that configures the dashtype.</param>
        public DiagramEditableResizeHandlesHoverStrokeSettingsBuilder DashType(string value)
        {
            container.DashType = value;

            return this;
        }
        
        //<< Fields
    }
}

