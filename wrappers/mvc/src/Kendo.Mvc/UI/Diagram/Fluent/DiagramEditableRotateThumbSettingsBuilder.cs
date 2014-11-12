namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableRotateThumbSettings settings.
    /// </summary>
    public class DiagramEditableRotateThumbSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramEditableRotateThumbSettings container;

        public DiagramEditableRotateThumbSettingsBuilder(DiagramEditableRotateThumbSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Set the thumb fill options.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramEditableRotateThumbSettingsBuilder<TShapeModel,TConnectionModel> Fill(Action<DiagramEditableRotateThumbFillSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableRotateThumbFillSettingsBuilder<TShapeModel,TConnectionModel>(container.Fill));
            return this;
        }
        
        /// <summary>
        /// Specifies the thumb stroke styles.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramEditableRotateThumbSettingsBuilder<TShapeModel,TConnectionModel> Stroke(Action<DiagramEditableRotateThumbStrokeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableRotateThumbStrokeSettingsBuilder<TShapeModel,TConnectionModel>(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

