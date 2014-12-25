namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShape settings.
    /// </summary>
    public class DiagramShapeBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramShape container;

        public DiagramShapeBuilder(DiagramShape settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the connectors the shape owns.
        /// </summary>
        /// <param name="configurator">The action that configures the connectors.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Connectors(Action<DiagramShapeConnectorFactory<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeConnectorFactory<TShapeModel,TConnectionModel>(container.Connectors));
            return this;
        }
        
        /// <summary>
        /// Defines the shapes content settings.
        /// </summary>
        /// <param name="configurator">The action that configures the content.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Content(Action<DiagramShapeContentSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeContentSettingsBuilder<TShapeModel,TConnectionModel>(container.Content));
            return this;
        }
        

        /// <summary>
        /// Defines the shape editable options.
        /// </summary>
        /// <param name="enabled">Enables or disables the editable option.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Editable(bool enabled)
        {
            container.Editable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// Defines the shape editable options.
        /// </summary>
        /// <param name="configurator">The action that configures the editable.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Editable(Action<DiagramShapeEditableSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            container.Editable.Enabled = true;
            
            configurator(new DiagramShapeEditableSettingsBuilder<TShapeModel,TConnectionModel>(container.Editable));
            return this;
        }
        
        /// <summary>
        /// Defines the fill options of the shape.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Fill(Action<DiagramShapeFillSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeFillSettingsBuilder<TShapeModel,TConnectionModel>(container.Fill));
            return this;
        }
        
        /// <summary>
        /// Defines the height of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Height(double value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// Defines the hover configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the hover.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Hover(Action<DiagramShapeHoverSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeHoverSettingsBuilder<TShapeModel,TConnectionModel>(container.Hover));
            return this;
        }
        
        /// <summary>
        /// The unique identifier for a Shape.
        /// </summary>
        /// <param name="value">The value that configures the id.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Id(string value)
        {
            container.Id = value;

            return this;
        }
        
        /// <summary>
        /// Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.
        /// </summary>
        /// <param name="value">The value that configures the minheight.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> MinHeight(double value)
        {
            container.MinHeight = value;

            return this;
        }
        
        /// <summary>
        /// Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.
        /// </summary>
        /// <param name="value">The value that configures the minwidth.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> MinWidth(double value)
        {
            container.MinWidth = value;

            return this;
        }
        
        /// <summary>
        /// The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (http://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").
        /// </summary>
        /// <param name="value">The value that configures the path.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Path(string value)
        {
            container.Path = value;

            return this;
        }
        
        /// <summary>
        /// The function that positions the connector.
        /// </summary>
        /// <param name="configurator">The action that configures the rotation.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Rotation(Action<DiagramShapeRotationSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeRotationSettingsBuilder<TShapeModel,TConnectionModel>(container.Rotation));
            return this;
        }
        
        /// <summary>
        /// The source of the shape image. Applicable when the type is set to "image".
        /// </summary>
        /// <param name="value">The value that configures the source.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Source(string value)
        {
            container.Source = value;

            return this;
        }
        
        /// <summary>
        /// Defines the stroke configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Stroke(Action<DiagramShapeStrokeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeStrokeSettingsBuilder<TShapeModel,TConnectionModel>(container.Stroke));
            return this;
        }
        
        /// <summary>
        /// Specifies the type of the Shape using any of the built-in shape type.
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Type(string value)
        {
            container.Type = value;

            return this;
        }
        
        /// <summary>
        /// Defines the width of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// Defines the x-coordinate of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the x.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> X(double value)
        {
            container.X = value;

            return this;
        }
        
        /// <summary>
        /// Defines the y-coordinate of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the y.</param>
        public DiagramShapeBuilder<TShapeModel,TConnectionModel> Y(double value)
        {
            container.Y = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Defines the inline visual template
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        public DiagramShapeBuilder<TShapeModel, TConnectionModel> Visual(Func<object, object> inlineCodeBlock)
        {
            container.Visual = new ClientHandlerDescriptor { TemplateDelegate = inlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will create the visual element.
        /// </summary>
        /// <param name="visualHandler">The name of the JavaScript function that will create the visual element.</param>
        public DiagramShapeBuilder<TShapeModel, TConnectionModel> Visual(string visualHandler)
        {
            container.Visual = new ClientHandlerDescriptor { HandlerName = visualHandler };

            return this;
        }
    }
}

