namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableSelectStrokeSettings settings.
    /// </summary>
    public class DiagramEditableSelectStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableSelectStrokeSettings container;

        public DiagramEditableSelectStrokeSettingsBuilder(DiagramEditableSelectStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the select stroke color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramEditableSelectStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the select stroke width.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramEditableSelectStrokeSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the select stroke dash type.
        /// </summary>
        /// <param name="value">The value that configures the dashtype.</param>
        public DiagramEditableSelectStrokeSettingsBuilder DashType(string value)
        {
            container.DashType = value;

            return this;
        }
        
        //<< Fields
    }
}

