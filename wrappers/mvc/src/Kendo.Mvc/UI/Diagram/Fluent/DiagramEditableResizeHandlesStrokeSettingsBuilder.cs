namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableResizeHandlesStrokeSettings settings.
    /// </summary>
    public class DiagramEditableResizeHandlesStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableResizeHandlesStrokeSettings container;

        public DiagramEditableResizeHandlesStrokeSettingsBuilder(DiagramEditableResizeHandlesStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the handles stroke color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramEditableResizeHandlesStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the handles stroke width.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramEditableResizeHandlesStrokeSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the handles stroke dash type.
        /// </summary>
        /// <param name="value">The value that configures the dashtype.</param>
        public DiagramEditableResizeHandlesStrokeSettingsBuilder DashType(string value)
        {
            container.DashType = value;

            return this;
        }
        
        //<< Fields
    }
}

