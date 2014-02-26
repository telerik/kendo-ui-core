namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeStrokeSettings settings.
    /// </summary>
    public class DiagramShapeStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeStrokeSettings container;

        public DiagramShapeStrokeSettingsBuilder(DiagramShapeStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the color of the shape's stroke.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramShapeStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Defines the thickness or width of the shape's stroke.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramShapeStrokeSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// The dash type of the shape.The following dash types are supported:
        /// </summary>
        /// <param name="value">The value that configures the dashtype.</param>
        public DiagramShapeStrokeSettingsBuilder DashType(string value)
        {
            container.DashType = value;

            return this;
        }
        
        //<< Fields
    }
}

