namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableRotateSettings settings.
    /// </summary>
    public class DiagramEditableRotateSettingsBuilder<TShapeModel,TConnectionModel>: IHideObjectMembers where TShapeModel : class  where TConnectionModel : class
    {
        private readonly DiagramEditableRotateSettings container;

        public DiagramEditableRotateSettingsBuilder(DiagramEditableRotateSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the fill settings of the rotation thumb.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramEditableRotateSettingsBuilder<TShapeModel,TConnectionModel> Fill(Action<DiagramEditableRotateFillSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableRotateFillSettingsBuilder<TShapeModel,TConnectionModel>(container.Fill));
            return this;
        }
        
        /// <summary>
        /// Specifies the stroke settings of the rotation thumb.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramEditableRotateSettingsBuilder<TShapeModel,TConnectionModel> Stroke(Action<DiagramEditableRotateStrokeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableRotateStrokeSettingsBuilder<TShapeModel,TConnectionModel>(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

