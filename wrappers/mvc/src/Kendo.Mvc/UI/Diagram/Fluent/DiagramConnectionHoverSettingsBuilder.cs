namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionHoverSettings settings.
    /// </summary>
    public class DiagramConnectionHoverSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionHoverSettings container;

        public DiagramConnectionHoverSettingsBuilder(DiagramConnectionHoverSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the hover stroke configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramConnectionHoverSettingsBuilder Stroke(Action<DiagramConnectionHoverStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionHoverStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

