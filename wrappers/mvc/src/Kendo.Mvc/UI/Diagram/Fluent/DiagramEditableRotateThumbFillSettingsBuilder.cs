namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableRotateThumbFillSettings settings.
    /// </summary>
    public class DiagramEditableRotateThumbFillSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableRotateThumbFillSettings container;

        public DiagramEditableRotateThumbFillSettingsBuilder(DiagramEditableRotateThumbFillSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Set the thumb fill color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramEditableRotateThumbFillSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Set the thumb fill opacity.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public DiagramEditableRotateThumbFillSettingsBuilder Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        //<< Fields
    }
}

