namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableResizeSettings settings.
    /// </summary>
    public class DiagramEditableResizeSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramEditableResizeSettings container;

        public DiagramEditableResizeSettingsBuilder(DiagramEditableResizeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the settings of the resizing handles. See the editable.resize configuration for an example.
        /// </summary>
        /// <param name="configurator">The action that configures the handles.</param>
        public DiagramEditableResizeSettingsBuilder<TShapeModel,TConnectionModel> Handles(Action<DiagramEditableResizeHandlesSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableResizeHandlesSettingsBuilder<TShapeModel,TConnectionModel>(container.Handles));
            return this;
        }
        
        //<< Fields
    }
}

