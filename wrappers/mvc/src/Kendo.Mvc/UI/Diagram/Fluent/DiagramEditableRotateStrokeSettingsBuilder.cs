namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableRotateStrokeSettings settings.
    /// </summary>
    public class DiagramEditableRotateStrokeSettingsBuilder<TShapeModel,TConnectionModel>: IHideObjectMembers where TShapeModel : class  where TConnectionModel : class
    {
        private readonly DiagramEditableRotateStrokeSettings container;

        public DiagramEditableRotateStrokeSettingsBuilder(DiagramEditableRotateStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the stroke color of the rotation thumb.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramEditableRotateStrokeSettingsBuilder<TShapeModel,TConnectionModel> Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the stroke thickness of the rotation thumb.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramEditableRotateStrokeSettingsBuilder<TShapeModel,TConnectionModel> Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        //<< Fields
    }
}

