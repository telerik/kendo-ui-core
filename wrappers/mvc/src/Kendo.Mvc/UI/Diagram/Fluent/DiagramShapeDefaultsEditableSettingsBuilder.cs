namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsEditableSettings settings.
    /// </summary>
    public class DiagramShapeDefaultsEditableSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramShapeDefaultsEditableSettings container;

        public DiagramShapeDefaultsEditableSettingsBuilder(DiagramShapeDefaultsEditableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies whether the connectors should appear on hover.
        /// </summary>
        /// <param name="value">The value that configures the connect.</param>
        public DiagramShapeDefaultsEditableSettingsBuilder<TShapeModel,TConnectionModel> Connect(bool value)
        {
            container.Connect = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the the toolbar tools. Predefined tools are:
        /// </summary>
        /// <param name="configurator">The action that configures the tools.</param>
        public DiagramShapeDefaultsEditableSettingsBuilder<TShapeModel,TConnectionModel> Tools(Action<DiagramShapeDefaultsEditableSettingsToolFactory<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeDefaultsEditableSettingsToolFactory<TShapeModel,TConnectionModel>(container.Tools));
            return this;
        }
        
        //<< Fields
    }
}

