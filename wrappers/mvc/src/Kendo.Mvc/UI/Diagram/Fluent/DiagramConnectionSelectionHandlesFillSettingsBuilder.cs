namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionSelectionHandlesFillSettings settings.
    /// </summary>
    public class DiagramConnectionSelectionHandlesFillSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramConnectionSelectionHandlesFillSettings container;

        public DiagramConnectionSelectionHandlesFillSettingsBuilder(DiagramConnectionSelectionHandlesFillSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the handles fill color.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public DiagramConnectionSelectionHandlesFillSettingsBuilder<TShapeModel,TConnectionModel> Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        //<< Fields
    }
}

