namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableRotateSettings settings.
    /// </summary>
    public class DiagramEditableRotateSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramEditableRotateSettings container;

        public DiagramEditableRotateSettingsBuilder(DiagramEditableRotateSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifyes the thumb style.
        /// </summary>
        /// <param name="configurator">The action that configures the thumb.</param>
        public DiagramEditableRotateSettingsBuilder<TShapeModel,TConnectionModel> Thumb(Action<DiagramEditableRotateThumbSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableRotateThumbSettingsBuilder<TShapeModel,TConnectionModel>(container.Thumb));
            return this;
        }
        
        //<< Fields
    }
}

