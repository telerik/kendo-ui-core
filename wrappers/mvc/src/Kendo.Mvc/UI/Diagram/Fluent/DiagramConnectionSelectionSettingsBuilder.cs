namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionSelectionSettings settings.
    /// </summary>
    public class DiagramConnectionSelectionSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionSelectionSettings container;

        public DiagramConnectionSelectionSettingsBuilder(DiagramConnectionSelectionSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the connection selection handles configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the handles.</param>
        public DiagramConnectionSelectionSettingsBuilder Handles(Action<DiagramConnectionSelectionHandlesSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionSelectionHandlesSettingsBuilder(container.Handles));
            return this;
        }
        
        //<< Fields
    }
}

