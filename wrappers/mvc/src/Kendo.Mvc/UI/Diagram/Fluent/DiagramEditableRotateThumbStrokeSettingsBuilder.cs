namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableRotateThumbStrokeSettings settings.
    /// </summary>
    public class DiagramEditableRotateThumbStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableRotateThumbStrokeSettings container;

        public DiagramEditableRotateThumbStrokeSettingsBuilder(DiagramEditableRotateThumbStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the thumb stroke color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramEditableRotateThumbStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the thumb stroke width.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramEditableRotateThumbStrokeSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the thumb stroke dash type.
        /// </summary>
        /// <param name="value">The value that configures the dashtype.</param>
        public DiagramEditableRotateThumbStrokeSettingsBuilder DashType(string value)
        {
            container.DashType = value;

            return this;
        }
        
        //<< Fields
    }
}

