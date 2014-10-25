namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableSettings settings.
    /// </summary>
    public class DiagramEditableSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramEditableSettings<TShapeModel, TConnectionModel> container;

        public DiagramEditableSettingsBuilder(DiagramEditableSettings<TShapeModel, TConnectionModel> settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the shape resizing.
        /// </summary>
        /// <param name="configurator">The action that configures the resize.</param>
        public DiagramEditableSettingsBuilder<TShapeModel, TConnectionModel> Resize(Action<DiagramEditableResizeSettingsBuilder> configurator)
        {
            configurator(new DiagramEditableResizeSettingsBuilder(container.Resize));
            return this;
        }
        
        /// <summary>
        /// Specifyes the rotate style.
        /// </summary>
        /// <param name="configurator">The action that configures the rotate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel, TConnectionModel> Rotate(Action<DiagramEditableRotateSettingsBuilder> configurator)
        {
            configurator(new DiagramEditableRotateSettingsBuilder(container.Rotate));
            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Specifies the shape resizing.
        /// </summary>
        /// <param name="visible">A value indicating if the resizing will be available.</param>
        public DiagramEditableSettingsBuilder<TShapeModel, TConnectionModel> Resize(bool visible)
        {
            if (!visible)
            {
                container.Resize = null;
            }
            
            return this;
        }

        /// <summary>
        /// Specifyes the rotate style.
        /// </summary>
        /// <param name="visible">A value indicating if the rotation will be available.</param>
        public DiagramEditableSettingsBuilder<TShapeModel, TConnectionModel> Rotate(bool visible)
        {
            if (!visible)
            {
                container.Rotate = null;
            }

            return this;
        }
    }
}

