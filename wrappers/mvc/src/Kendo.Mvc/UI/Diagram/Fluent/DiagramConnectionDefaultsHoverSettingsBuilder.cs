namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsHoverSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsHoverSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionDefaultsHoverSettings container;

        public DiagramConnectionDefaultsHoverSettingsBuilder(DiagramConnectionDefaultsHoverSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the hover stroke configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramConnectionDefaultsHoverSettingsBuilder Stroke(Action<DiagramConnectionDefaultsHoverStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionDefaultsHoverStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

