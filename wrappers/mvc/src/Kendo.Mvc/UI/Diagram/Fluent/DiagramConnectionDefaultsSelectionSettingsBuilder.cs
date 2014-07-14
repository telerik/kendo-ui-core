namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsSelectionSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsSelectionSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionDefaultsSelectionSettings container;

        public DiagramConnectionDefaultsSelectionSettingsBuilder(DiagramConnectionDefaultsSelectionSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the connection selection handles configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the handles.</param>
        public DiagramConnectionDefaultsSelectionSettingsBuilder Handles(Action<DiagramConnectionDefaultsSelectionHandlesSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionDefaultsSelectionHandlesSettingsBuilder(container.Handles));
            return this;
        }
        
        //<< Fields
    }
}

