namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsHoverSettings settings.
    /// </summary>
    public class DiagramShapeDefaultsHoverSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeDefaultsHoverSettings container;

        public DiagramShapeDefaultsHoverSettingsBuilder(DiagramShapeDefaultsHoverSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Hover's fill options.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramShapeDefaultsHoverSettingsBuilder Fill(Action<DiagramShapeDefaultsHoverFillSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeDefaultsHoverFillSettingsBuilder(container.Fill));
            return this;
        }
        
        //<< Fields
    }
}

