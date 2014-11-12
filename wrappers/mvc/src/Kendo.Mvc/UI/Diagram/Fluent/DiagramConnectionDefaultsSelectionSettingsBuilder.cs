namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsSelectionSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsSelectionSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
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
        public DiagramConnectionDefaultsSelectionSettingsBuilder<TShapeModel,TConnectionModel> Handles(Action<DiagramConnectionDefaultsSelectionHandlesSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDefaultsSelectionHandlesSettingsBuilder<TShapeModel,TConnectionModel>(container.Handles));
            return this;
        }
        
        //<< Fields
    }
}

