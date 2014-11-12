namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsEditableSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsEditableSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionDefaultsEditableSettings container;

        public DiagramConnectionDefaultsEditableSettingsBuilder(DiagramConnectionDefaultsEditableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the the toolbar tools. Predefined tools are:
        /// </summary>
        /// <param name="configurator">The action that configures the tools.</param>
        public DiagramConnectionDefaultsEditableSettingsBuilder Tools(Action<DiagramConnectionDefaultsEditableSettingsToolFactory> configurator)
        {
            configurator(new DiagramConnectionDefaultsEditableSettingsToolFactory(container.Tools));
            return this;
        }
        
        //<< Fields
    }
}

