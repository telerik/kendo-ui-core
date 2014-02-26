namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsStrokeSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionDefaultsStrokeSettings container;

        public DiagramConnectionDefaultsStrokeSettingsBuilder(DiagramConnectionDefaultsStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the stroke or line color of the connection.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramConnectionDefaultsStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Defines the stroke width of the connection.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramConnectionDefaultsStrokeSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        //<< Fields
    }
}

