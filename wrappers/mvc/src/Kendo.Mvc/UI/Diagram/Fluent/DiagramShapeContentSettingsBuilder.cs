namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeContentSettings settings.
    /// </summary>
    public class DiagramShapeContentSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeContentSettings container;

        public DiagramShapeContentSettingsBuilder(DiagramShapeContentSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The text displayed in the shape.
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public DiagramShapeContentSettingsBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        /// <summary>
        /// The alignment of the text inside the shape.
        /// </summary>
        /// <param name="value">The value that configures the align.</param>
        public DiagramShapeContentSettingsBuilder Align(string value)
        {
            container.Align = value;

            return this;
        }
        
        //<< Fields
    }
}

