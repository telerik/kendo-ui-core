namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableResizeHandlesHoverSettings settings.
    /// </summary>
    public class DiagramEditableResizeHandlesHoverSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramEditableResizeHandlesHoverSettings container;

        public DiagramEditableResizeHandlesHoverSettingsBuilder(DiagramEditableResizeHandlesHoverSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Set the handles hover fill options.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramEditableResizeHandlesHoverSettingsBuilder<TShapeModel,TConnectionModel> Fill(Action<DiagramEditableResizeHandlesHoverFillSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableResizeHandlesHoverFillSettingsBuilder<TShapeModel,TConnectionModel>(container.Fill));
            return this;
        }
        
        /// <summary>
        /// Specifies the handles stroke styles.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramEditableResizeHandlesHoverSettingsBuilder<TShapeModel,TConnectionModel> Stroke(Action<DiagramEditableResizeHandlesHoverStrokeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableResizeHandlesHoverStrokeSettingsBuilder<TShapeModel,TConnectionModel>(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

