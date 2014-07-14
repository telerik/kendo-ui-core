namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeHoverSettings settings.
    /// </summary>
    public class DiagramShapeHoverSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeHoverSettings container;

        public DiagramShapeHoverSettingsBuilder(DiagramShapeHoverSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Hover's fill options.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramShapeHoverSettingsBuilder Fill(Action<DiagramShapeHoverFillSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeHoverFillSettingsBuilder(container.Fill));
            return this;
        }
        
        //<< Fields
    }
}

