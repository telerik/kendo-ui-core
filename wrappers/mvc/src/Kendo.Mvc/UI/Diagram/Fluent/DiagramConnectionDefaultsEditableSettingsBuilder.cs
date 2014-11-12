namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsEditableSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsEditableSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
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
        public DiagramConnectionDefaultsEditableSettingsBuilder<TShapeModel,TConnectionModel> Tools(Action<DiagramConnectionDefaultsEditableSettingsToolFactory<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDefaultsEditableSettingsToolFactory<TShapeModel,TConnectionModel>(container.Tools));
            return this;
        }
        
        //<< Fields
    }
}

