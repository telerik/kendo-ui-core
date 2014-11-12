namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeHoverFillSettings settings.
    /// </summary>
    public class DiagramShapeHoverFillSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramShapeHoverFillSettings container;

        public DiagramShapeHoverFillSettingsBuilder(DiagramShapeHoverFillSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Hover's fill color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramShapeHoverFillSettingsBuilder<TShapeModel,TConnectionModel> Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Hover's fill opacity.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public DiagramShapeHoverFillSettingsBuilder<TShapeModel,TConnectionModel> Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        //<< Fields
    }
}

