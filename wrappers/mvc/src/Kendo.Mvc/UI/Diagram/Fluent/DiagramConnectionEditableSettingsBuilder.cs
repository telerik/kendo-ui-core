namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionEditableSettings settings.
    /// </summary>
    public class DiagramConnectionEditableSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionEditableSettings container;

        public DiagramConnectionEditableSettingsBuilder(DiagramConnectionEditableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the the toolbar tools. Predefined tools are:
        /// </summary>
        /// <param name="configurator">The action that configures the tools.</param>
        public DiagramConnectionEditableSettingsBuilder Tools(Action<DiagramConnectionEditableSettingsToolFactory> configurator)
        {
            configurator(new DiagramConnectionEditableSettingsToolFactory(container.Tools));
            return this;
        }
        
        //<< Fields
    }
}

