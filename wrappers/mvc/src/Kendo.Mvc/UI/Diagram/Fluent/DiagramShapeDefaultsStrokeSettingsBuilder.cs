namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsStrokeSettings settings.
    /// </summary>
    public class DiagramShapeDefaultsStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeDefaultsStrokeSettings container;

        public DiagramShapeDefaultsStrokeSettingsBuilder(DiagramShapeDefaultsStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the color of the shape's stroke.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramShapeDefaultsStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Defines the thickness or width of the shape's stroke.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramShapeDefaultsStrokeSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// The dash type of the shape.The following dash types are supported:
        /// </summary>
        /// <param name="value">The value that configures the dashtype.</param>
        public DiagramShapeDefaultsStrokeSettingsBuilder DashType(string value)
        {
            container.DashType = value;

            return this;
        }
        
        //<< Fields
    }
}

