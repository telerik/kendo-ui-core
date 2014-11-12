namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableSelectSettings settings.
    /// </summary>
    public class DiagramEditableSelectSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramEditableSelectSettings container;

        public DiagramEditableSelectSettingsBuilder(DiagramEditableSelectSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Set the thumb backgorund.
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public DiagramEditableSelectSettingsBuilder<TShapeModel, TConnectionModel> Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the select stroke styles.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramEditableSelectSettingsBuilder<TShapeModel, TConnectionModel> Stroke(Action<DiagramEditableSelectStrokeSettingsBuilder<TShapeModel, TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableSelectStrokeSettingsBuilder<TShapeModel, TConnectionModel>(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

