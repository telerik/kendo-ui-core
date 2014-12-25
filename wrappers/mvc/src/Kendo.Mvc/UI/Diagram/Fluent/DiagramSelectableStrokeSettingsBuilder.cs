namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramSelectableStrokeSettings settings.
    /// </summary>
    public class DiagramSelectableStrokeSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramSelectableStrokeSettings container;

        public DiagramSelectableStrokeSettingsBuilder(DiagramSelectableStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the selection stroke color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramSelectableStrokeSettingsBuilder<TShapeModel,TConnectionModel> Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// Defines the selection dash type.
        /// </summary>
        /// <param name="value">The value that configures the dashtype.</param>
        public DiagramSelectableStrokeSettingsBuilder<TShapeModel,TConnectionModel> DashType(string value)
        {
            container.DashType = value;

            return this;
        }
        
        /// <summary>
        /// Defines the selection stroke width.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramSelectableStrokeSettingsBuilder<TShapeModel,TConnectionModel> Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        //<< Fields
    }
}

