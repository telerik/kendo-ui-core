namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShape settings.
    /// </summary>
    public class DiagramShapeBuilder: IHideObjectMembers
    {
        private readonly DiagramShape container;

        public DiagramShapeBuilder(DiagramShape settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies if the shape is editable by the user.
        /// </summary>
        /// <param name="value">The value that configures the editable.</param>
        public DiagramShapeBuilder Editable(bool value)
        {
            container.Editable = value;

            return this;
        }
        
        /// <summary>
        /// The unique identifier for a Shape.
        /// </summary>
        /// <param name="value">The value that configures the id.</param>
        public DiagramShapeBuilder Id(string value)
        {
            container.Id = value;

            return this;
        }
        
        /// <summary>
        /// Specifies if the user is allowed to rotate the shape.
        /// </summary>
        /// <param name="value">The value that configures the rotatable.</param>
        public DiagramShapeBuilder Rotatable(bool value)
        {
            container.Rotatable = value;

            return this;
        }
        
        /// <summary>
        /// Specifies if the shape is resizable.
        /// </summary>
        /// <param name="value">The value that configures the resizable.</param>
        public DiagramShapeBuilder Resizable(bool value)
        {
            container.Resizable = value;

            return this;
        }
        
        /// <summary>
        /// The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (http://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").
        /// </summary>
        /// <param name="value">The value that configures the path.</param>
        public DiagramShapeBuilder Path(string value)
        {
            container.Path = value;

            return this;
        }
        
        /// <summary>
        /// Defines the stroke configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramShapeBuilder Stroke(Action<DiagramShapeStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        /// <summary>
        /// Specifies the type of the Shape using any of the built-in shape type.
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public DiagramShapeBuilder Type(string value)
        {
            container.Type = value;

            return this;
        }
        
        /// <summary>
        /// Defines the x-coordinate of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the x.</param>
        public DiagramShapeBuilder X(double value)
        {
            container.X = value;

            return this;
        }
        
        /// <summary>
        /// Defines the y-coordinate of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the y.</param>
        public DiagramShapeBuilder Y(double value)
        {
            container.Y = value;

            return this;
        }
        
        /// <summary>
        /// Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.
        /// </summary>
        /// <param name="value">The value that configures the minwidth.</param>
        public DiagramShapeBuilder MinWidth(double value)
        {
            container.MinWidth = value;

            return this;
        }
        
        /// <summary>
        /// Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.
        /// </summary>
        /// <param name="value">The value that configures the minheight.</param>
        public DiagramShapeBuilder MinHeight(double value)
        {
            container.MinHeight = value;

            return this;
        }
        
        /// <summary>
        /// Defines the width of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramShapeBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// Defines the height of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public DiagramShapeBuilder Height(double value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// Defines the fill-color of the shape.
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public DiagramShapeBuilder Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        /// <summary>
        /// Defines the hover configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the hover.</param>
        public DiagramShapeBuilder Hover(Action<DiagramShapeHoverSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeHoverSettingsBuilder(container.Hover));
            return this;
        }
        
        /// <summary>
        /// Defines the connectors the shape owns.
        /// </summary>
        /// <param name="configurator">The action that configures the connectors.</param>
        public DiagramShapeBuilder Connectors(Action<DiagramShapeConnectorFactory> configurator)
        {
            configurator(new DiagramShapeConnectorFactory(container.Connectors));
            return this;
        }
        
        /// <summary>
        /// The function that positions the connector.
        /// </summary>
        /// <param name="configurator">The action that configures the rotation.</param>
        public DiagramShapeBuilder Rotation(Action<DiagramShapeRotationSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeRotationSettingsBuilder(container.Rotation));
            return this;
        }
        
        /// <summary>
        /// Defines the shapes content settings.
        /// </summary>
        /// <param name="configurator">The action that configures the content.</param>
        public DiagramShapeBuilder Content(Action<DiagramShapeContentSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeContentSettingsBuilder(container.Content));
            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Defines the inline visual template
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        public DiagramShapeBuilder Visual(Func<object, object> inlineCodeBlock)
        {
            container.Visual = new ClientHandlerDescriptor { TemplateDelegate = inlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will create the visual element.
        /// </summary>
        /// <param name="visualHandler">The name of the JavaScript function that will create the visual element.</param>
        public DiagramShapeBuilder Visual(string visualHandler)
        {
            container.Visual = new ClientHandlerDescriptor { HandlerName = visualHandler };

            return this;
        }
    }
}

