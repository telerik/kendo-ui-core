namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionEditableSettings settings.
    /// </summary>
    public class DiagramConnectionEditableSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
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
        public DiagramConnectionEditableSettingsBuilder<TShapeModel,TConnectionModel> Tools(Action<DiagramConnectionEditableSettingsToolFactory<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionEditableSettingsToolFactory<TShapeModel,TConnectionModel>(container.Tools));
            return this;
        }
        
        //<< Fields
    }
}

