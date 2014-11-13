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
        /// Specifies the shape editor template.
        /// </summary>
        /// <param name="value">The value that configures the shapetemplate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> ShapeTemplate(string value)
        {
            container.ShapeTemplate = value;

            return this;
        }

        /// <summary>
        /// Specifies the shape editor template.
        /// </summary>
        /// <param name="value">The value that configures the shapetemplate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> ShapeTemplateId(string value)
        {
            container.ShapeTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the connection editor template.
        /// </summary>
        /// <param name="value">The value that configures the connectiontemplate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> ConnectionTemplate(string value)
        {
            container.ConnectionTemplate = value;

            return this;
        }

        /// <summary>
        /// Specifies the connection editor template.
        /// </summary>
        /// <param name="value">The value that configures the connectiontemplate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> ConnectionTemplateId(string value)
        {
            container.ConnectionTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the the toolbar tools. Predefined tools are:
        /// </summary>
        /// <param name="configurator">The action that configures the tools.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> Tools(Action<DiagramEditableSettingsToolFactory<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramEditableSettingsToolFactory<TShapeModel,TConnectionModel>(container.Tools));
            return this;
        }
        

        /// <summary>
        /// Specifies the shape resizing.
        /// </summary>
        /// <param name="enabled">Enables or disables the resize option.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> Resize(bool enabled)
        {
            container.Resize.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// Specifies the shape resizing.
        /// </summary>
        /// <param name="configurator">The action that configures the resize.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> Resize(Action<DiagramEditableResizeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            container.Resize.Enabled = true;
            
            configurator(new DiagramEditableResizeSettingsBuilder<TShapeModel,TConnectionModel>(container.Resize));
            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Specifies the shape editor template.
        /// </summary>
        /// <param name="value">The value that configures the shapetemplate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel, TConnectionModel> ShapeTemplateName(string value)
        {
            container.ShapeTemplateName = value;

            return this;
        }

        /// <summary>
        /// Specifies the connection editor template.
        /// </summary>
        /// <param name="value">The value that configures the connectiontemplate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel, TConnectionModel> ConnectionTemplateName(string value)
        {
            container.ConnectionTemplateName = value;

            return this;
        }
    }
}

