namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsHoverStrokeSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsHoverStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionDefaultsHoverStrokeSettings container;

        public DiagramConnectionDefaultsHoverStrokeSettingsBuilder(DiagramConnectionDefaultsHoverStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the highlight color when the pointer is hovering over the connection.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramConnectionDefaultsHoverStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        //<< Fields
    }
}

