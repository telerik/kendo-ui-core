namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramSelectableSettings settings.
    /// </summary>
    public class DiagramSelectableSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramSelectableSettings container;

        public DiagramSelectableSettingsBuilder(DiagramSelectableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the selection stroke configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramSelectableSettingsBuilder<TShapeModel,TConnectionModel> Stroke(Action<DiagramSelectableStrokeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramSelectableStrokeSettingsBuilder<TShapeModel,TConnectionModel>(container.Stroke));
            return this;
        }
        
        /// <summary>
        /// The selectable key.
        /// </summary>
        /// <param name="value">The value that configures the key.</param>
        public DiagramSelectableSettingsBuilder<TShapeModel,TConnectionModel> Key(DiagramSelectableKey value)
        {
            container.Key = value;

            return this;
        }
        
        //<< Fields
    }
}

