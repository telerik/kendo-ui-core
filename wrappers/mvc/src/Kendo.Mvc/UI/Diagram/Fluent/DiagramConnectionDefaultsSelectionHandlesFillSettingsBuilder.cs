namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsSelectionHandlesFillSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsSelectionHandlesFillSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionDefaultsSelectionHandlesFillSettings container;

        public DiagramConnectionDefaultsSelectionHandlesFillSettingsBuilder(DiagramConnectionDefaultsSelectionHandlesFillSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the handles fill color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramConnectionDefaultsSelectionHandlesFillSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        //<< Fields
    }
}

