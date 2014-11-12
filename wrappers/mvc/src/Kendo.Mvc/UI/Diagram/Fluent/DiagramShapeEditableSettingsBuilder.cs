namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeEditableSettings settings.
    /// </summary>
    public class DiagramShapeEditableSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramShapeEditableSettings container;

        public DiagramShapeEditableSettingsBuilder(DiagramShapeEditableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies whether the connectors should appear on hover.
        /// </summary>
        /// <param name="value">The value that configures the connect.</param>
        public DiagramShapeEditableSettingsBuilder<TShapeModel,TConnectionModel> Connect(bool value)
        {
            container.Connect = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the the toolbar tools. Predefined tools are:
        /// </summary>
        /// <param name="configurator">The action that configures the tools.</param>
        public DiagramShapeEditableSettingsBuilder<TShapeModel,TConnectionModel> Tools(Action<DiagramShapeEditableSettingsToolFactory<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeEditableSettingsToolFactory<TShapeModel,TConnectionModel>(container.Tools));
            return this;
        }
        
        //<< Fields
    }
}

