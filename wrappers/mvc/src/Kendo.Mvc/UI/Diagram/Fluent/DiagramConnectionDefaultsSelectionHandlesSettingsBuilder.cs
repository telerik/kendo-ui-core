namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsSelectionHandlesSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsSelectionHandlesSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramConnectionDefaultsSelectionHandlesSettings container;

        public DiagramConnectionDefaultsSelectionHandlesSettingsBuilder(DiagramConnectionDefaultsSelectionHandlesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the handles fill options.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramConnectionDefaultsSelectionHandlesSettingsBuilder<TShapeModel,TConnectionModel> Fill(Action<DiagramConnectionDefaultsSelectionHandlesFillSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDefaultsSelectionHandlesFillSettingsBuilder<TShapeModel,TConnectionModel>(container.Fill));
            return this;
        }
        
        /// <summary>
        /// Defines the handles stroke options.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramConnectionDefaultsSelectionHandlesSettingsBuilder<TShapeModel,TConnectionModel> Stroke(Action<DiagramConnectionDefaultsSelectionHandlesStrokeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDefaultsSelectionHandlesStrokeSettingsBuilder<TShapeModel,TConnectionModel>(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

