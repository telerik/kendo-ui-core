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
        /// Specifies the connection editor template which shows up when editing the connection via a pop-up editor much like 'editable.template' configuration of the Kendo UI Grid widget.
        /// </summary>
        /// <param name="value">The value that configures the connectiontemplate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> ConnectionTemplate(string value)
        {
            container.ConnectionTemplate = value;

            return this;
        }

        /// <summary>
        /// Specifies the connection editor template which shows up when editing the connection via a pop-up editor much like 'editable.template' configuration of the Kendo UI Grid widget.
        /// </summary>
        /// <param name="value">The value that configures the connectiontemplate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> ConnectionTemplateId(string value)
        {
            container.ConnectionTemplateId = value;

            return this;
        }
        

        /// <summary>
        /// Defines the look-and-feel of the resizing handles.
        /// </summary>
        /// <param name="enabled">Enables or disables the resize option.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> Resize(bool enabled)
        {
            container.Resize.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// Defines the look-and-feel of the resizing handles.
        /// </summary>
        /// <param name="configurator">The action that configures the resize.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> Resize(Action<DiagramEditableResizeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            container.Resize.Enabled = true;
            
            configurator(new DiagramEditableResizeSettingsBuilder<TShapeModel,TConnectionModel>(container.Resize));
            return this;
        }
        

        /// <summary>
        /// Specifies whether the shapes can be rotated. Note that changing this setting after creating the diagram will have no effect.
        /// </summary>
        /// <param name="enabled">Enables or disables the rotate option.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> Rotate(bool enabled)
        {
            container.Rotate.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// Specifies whether the shapes can be rotated. Note that changing this setting after creating the diagram will have no effect.
        /// </summary>
        /// <param name="configurator">The action that configures the rotate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> Rotate(Action<DiagramEditableRotateSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            container.Rotate.Enabled = true;
            
            configurator(new DiagramEditableRotateSettingsBuilder<TShapeModel,TConnectionModel>(container.Rotate));
            return this;
        }
        
        /// <summary>
        /// Specifies the shape editor template. See the 'editable.connectionTemplate' for an example.
        /// </summary>
        /// <param name="value">The value that configures the shapetemplate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> ShapeTemplate(string value)
        {
            container.ShapeTemplate = value;

            return this;
        }

        /// <summary>
        /// Specifies the shape editor template. See the 'editable.connectionTemplate' for an example.
        /// </summary>
        /// <param name="value">The value that configures the shapetemplate.</param>
        public DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel> ShapeTemplateId(string value)
        {
            container.ShapeTemplateId = value;

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

