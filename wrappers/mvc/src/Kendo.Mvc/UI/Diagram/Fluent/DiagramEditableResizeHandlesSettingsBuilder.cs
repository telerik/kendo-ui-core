namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableResizeHandlesSettings settings.
    /// </summary>
    public class DiagramEditableResizeHandlesSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramEditableResizeHandlesSettings container;

        public DiagramEditableResizeHandlesSettingsBuilder(DiagramEditableResizeHandlesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the fill settings of the resizing handles. See the editable.resize configuration for an example.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramEditableResizeHandlesSettingsBuilder<TShapeModel,TConnectionModel> Fill(Action<DiagramEditableResizeHandlesFillSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableResizeHandlesFillSettingsBuilder<TShapeModel,TConnectionModel>(container.Fill));
            return this;
        }
        
        /// <summary>
        /// Specifies the height of the resizing handles. See the editable.resize configuration for an example.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public DiagramEditableResizeHandlesSettingsBuilder<TShapeModel,TConnectionModel> Height(double value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the settings of the resizing handles on hovering over them. See the editable.resize configuration for an example.
        /// </summary>
        /// <param name="configurator">The action that configures the hover.</param>
        public DiagramEditableResizeHandlesSettingsBuilder<TShapeModel,TConnectionModel> Hover(Action<DiagramEditableResizeHandlesHoverSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableResizeHandlesHoverSettingsBuilder<TShapeModel,TConnectionModel>(container.Hover));
            return this;
        }
        
        /// <summary>
        /// Specifies the stroke of the resizing handles. See the editable.resize configuration for an example.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramEditableResizeHandlesSettingsBuilder<TShapeModel,TConnectionModel> Stroke(Action<DiagramEditableResizeHandlesStrokeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableResizeHandlesStrokeSettingsBuilder<TShapeModel,TConnectionModel>(container.Stroke));
            return this;
        }
        
        /// <summary>
        /// Specifies the width of the resizing handles. See the editable.resize configuration for an example.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramEditableResizeHandlesSettingsBuilder<TShapeModel,TConnectionModel> Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        //<< Fields
    }
}

