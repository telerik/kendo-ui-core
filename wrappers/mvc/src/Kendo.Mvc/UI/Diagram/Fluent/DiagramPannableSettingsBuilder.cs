namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramPannableSettings settings.
    /// </summary>
    public class DiagramPannableSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramPannableSettings container;

        public DiagramPannableSettingsBuilder(DiagramPannableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The pannable key.
        /// </summary>
        /// <param name="value">The value that configures the key.</param>
        public DiagramPannableSettingsBuilder<TShapeModel,TConnectionModel> Key(DiagramPannableKey value)
        {
            container.Key = value;

            return this;
        }
        
        //<< Fields
    }
}

