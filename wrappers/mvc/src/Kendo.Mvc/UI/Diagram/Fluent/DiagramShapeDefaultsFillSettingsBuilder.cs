namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsFillSettings settings.
    /// </summary>
    public class DiagramShapeDefaultsFillSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramShapeDefaultsFillSettings container;

        public DiagramShapeDefaultsFillSettingsBuilder(DiagramShapeDefaultsFillSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the fill color of the shape.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramShapeDefaultsFillSettingsBuilder<TShapeModel,TConnectionModel> Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Defines the fill opacity of the shape.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public DiagramShapeDefaultsFillSettingsBuilder<TShapeModel,TConnectionModel> Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        //<< Fields
    }
}

