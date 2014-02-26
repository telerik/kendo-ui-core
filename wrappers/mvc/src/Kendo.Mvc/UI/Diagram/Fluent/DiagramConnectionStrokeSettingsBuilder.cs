namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionStrokeSettings settings.
    /// </summary>
    public class DiagramConnectionStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionStrokeSettings container;

        public DiagramConnectionStrokeSettingsBuilder(DiagramConnectionStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the stroke or line color of the connection.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramConnectionStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Defines the stroke width of the connection.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramConnectionStrokeSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        //<< Fields
    }
}

