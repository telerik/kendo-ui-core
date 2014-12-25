namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableRotateFillSettings settings.
    /// </summary>
    public class DiagramEditableRotateFillSettingsBuilder<TShapeModel,TConnectionModel>: IHideObjectMembers where TShapeModel : class  where TConnectionModel : class
    {
        private readonly DiagramEditableRotateFillSettings container;

        public DiagramEditableRotateFillSettingsBuilder(DiagramEditableRotateFillSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the fill color of the rotation thumb.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramEditableRotateFillSettingsBuilder<TShapeModel,TConnectionModel> Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the fill opacity of the rotation thumb.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public DiagramEditableRotateFillSettingsBuilder<TShapeModel,TConnectionModel> Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        //<< Fields
    }
}

