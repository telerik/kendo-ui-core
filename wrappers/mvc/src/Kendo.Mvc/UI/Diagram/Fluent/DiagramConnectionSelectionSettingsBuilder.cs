namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionSelectionSettings settings.
    /// </summary>
    public class DiagramConnectionSelectionSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
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
        public DiagramConnectionSelectionSettingsBuilder<TShapeModel,TConnectionModel> Handles(Action<DiagramConnectionSelectionHandlesSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionSelectionHandlesSettingsBuilder<TShapeModel,TConnectionModel>(container.Handles));
            return this;
        }
        
        //<< Fields
    }
}

