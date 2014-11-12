namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionSelectionHandlesSettings settings.
    /// </summary>
    public class DiagramConnectionSelectionHandlesSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramConnectionSelectionHandlesSettings container;

        public DiagramConnectionSelectionHandlesSettingsBuilder(DiagramConnectionSelectionHandlesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the handles fill options.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramConnectionSelectionHandlesSettingsBuilder<TShapeModel,TConnectionModel> Fill(Action<DiagramConnectionSelectionHandlesFillSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionSelectionHandlesFillSettingsBuilder<TShapeModel,TConnectionModel>(container.Fill));
            return this;
        }
        
        /// <summary>
        /// Defines the handles stroke options.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramConnectionSelectionHandlesSettingsBuilder<TShapeModel,TConnectionModel> Stroke(Action<DiagramConnectionSelectionHandlesStrokeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionSelectionHandlesStrokeSettingsBuilder<TShapeModel,TConnectionModel>(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

