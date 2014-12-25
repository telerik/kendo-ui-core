namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsSettings settings.
    /// </summary>
    public class DiagramShapeDefaultsSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramShapeDefaultsSettings container;

        public DiagramShapeDefaultsSettingsBuilder(DiagramShapeDefaultsSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the connectors the shape owns.You can easily define your own custom connectors or mix-match with the above defined custom connectors.Example - custom shape with custom connectorsThe following defines a custom shape with connectors adapted to the shape's outline. Note in particular the various helpful methods (right(), left(), top()) to define positions relative to the shape.
        /// </summary>
        /// <param name="configurator">The action that configures the connectors.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Connectors(Action<DiagramShapeDefaultsSettingsConnectorFactory<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeDefaultsSettingsConnectorFactory<TShapeModel,TConnectionModel>(container.Connectors));
            return this;
        }
        
        /// <summary>
        /// Defines the shapes content settings.
        /// </summary>
        /// <param name="configurator">The action that configures the content.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Content(Action<DiagramShapeDefaultsContentSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeDefaultsContentSettingsBuilder<TShapeModel,TConnectionModel>(container.Content));
            return this;
        }
        

        /// <summary>
        /// Defines the shape editable options.
        /// </summary>
        /// <param name="enabled">Enables or disables the editable option.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Editable(bool enabled)
        {
            container.Editable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// Defines the shape editable options.
        /// </summary>
        /// <param name="configurator">The action that configures the editable.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Editable(Action<DiagramShapeDefaultsEditableSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            container.Editable.Enabled = true;
            
            configurator(new DiagramShapeDefaultsEditableSettingsBuilder<TShapeModel,TConnectionModel>(container.Editable));
            return this;
        }
        
        /// <summary>
        /// Defines the fill options of the shape.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Fill(Action<DiagramShapeDefaultsFillSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeDefaultsFillSettingsBuilder<TShapeModel,TConnectionModel>(container.Fill));
            return this;
        }
        
        /// <summary>
        /// Defines the height of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Height(double value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// Defines the hover configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the hover.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Hover(Action<DiagramShapeDefaultsHoverSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeDefaultsHoverSettingsBuilder<TShapeModel,TConnectionModel>(container.Hover));
            return this;
        }
        
        /// <summary>
        /// Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.
        /// </summary>
        /// <param name="value">The value that configures the minheight.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> MinHeight(double value)
        {
            container.MinHeight = value;

            return this;
        }
        
        /// <summary>
        /// Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.
        /// </summary>
        /// <param name="value">The value that configures the minwidth.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> MinWidth(double value)
        {
            container.MinWidth = value;

            return this;
        }
        
        /// <summary>
        /// The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (http://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").
        /// </summary>
        /// <param name="value">The value that configures the path.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Path(string value)
        {
            container.Path = value;

            return this;
        }
        
        /// <summary>
        /// Defines the rotation of the shape.
        /// </summary>
        /// <param name="configurator">The action that configures the rotation.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Rotation(Action<DiagramShapeDefaultsRotationSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeDefaultsRotationSettingsBuilder<TShapeModel,TConnectionModel>(container.Rotation));
            return this;
        }
        
        /// <summary>
        /// The source of the shape image. Applicable when the type is set to "image".
        /// </summary>
        /// <param name="value">The value that configures the source.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Source(string value)
        {
            container.Source = value;

            return this;
        }
        
        /// <summary>
        /// Defines the stroke configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Stroke(Action<DiagramShapeDefaultsStrokeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeDefaultsStrokeSettingsBuilder<TShapeModel,TConnectionModel>(container.Stroke));
            return this;
        }
        
        /// <summary>
        /// Specifies the type of the Shape using any of the built-in shape type.
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Type(string value)
        {
            container.Type = value;

            return this;
        }
        
        /// <summary>
        /// Defines the width of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// Defines the x-coordinate of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the x.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> X(double value)
        {
            container.X = value;

            return this;
        }
        
        /// <summary>
        /// Defines the y-coordinate of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the y.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Y(double value)
        {
            container.Y = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Defines the inline visual template
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel, TConnectionModel> Visual(Func<object, object> inlineCodeBlock)
        {
            container.Visual = new ClientHandlerDescriptor { TemplateDelegate = inlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will create the visual element.
        /// </summary>
        /// <param name="visualHandler">The name of the JavaScript function that will create the visual element.</param>
        public DiagramShapeDefaultsSettingsBuilder<TShapeModel, TConnectionModel> Visual(string visualHandler)
        {
            container.Visual = new ClientHandlerDescriptor { HandlerName = visualHandler };

            return this;
        }
    }
}

