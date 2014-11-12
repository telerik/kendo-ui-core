namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeHoverSettings settings.
    /// </summary>
    public class DiagramShapeHoverSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramShapeHoverSettings container;

        public DiagramShapeHoverSettingsBuilder(DiagramShapeHoverSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Hover's fill options.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramShapeHoverSettingsBuilder<TShapeModel,TConnectionModel> Fill(Action<DiagramShapeHoverFillSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeHoverFillSettingsBuilder<TShapeModel,TConnectionModel>(container.Fill));
            return this;
        }
        
        //<< Fields
    }
}

