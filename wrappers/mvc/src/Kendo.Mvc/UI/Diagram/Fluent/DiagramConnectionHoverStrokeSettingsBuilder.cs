namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionHoverStrokeSettings settings.
    /// </summary>
    public class DiagramConnectionHoverStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionHoverStrokeSettings container;

        public DiagramConnectionHoverStrokeSettingsBuilder(DiagramConnectionHoverStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the highlight color when the pointer is hovering over the connection.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramConnectionHoverStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        //<< Fields
    }
}

