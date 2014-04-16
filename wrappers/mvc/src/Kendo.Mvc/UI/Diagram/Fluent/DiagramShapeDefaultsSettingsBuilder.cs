namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsSettings settings.
    /// </summary>
    public class DiagramShapeDefaultsSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeDefaultsSettings container;

        public DiagramShapeDefaultsSettingsBuilder(DiagramShapeDefaultsSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (http://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").
        /// </summary>
        /// <param name="value">The value that configures the path.</param>
        public DiagramShapeDefaultsSettingsBuilder Path(string value)
        {
            container.Path = value;

            return this;
        }
        
        /// <summary>
        /// Defines the stroke configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramShapeDefaultsSettingsBuilder Stroke(Action<DiagramShapeDefaultsStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeDefaultsStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        /// <summary>
        /// Specifies the type of the Shape using any of the built-in shape type.
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public DiagramShapeDefaultsSettingsBuilder Type(string value)
        {
            container.Type = value;

            return this;
        }
        
        /// <summary>
        /// Defines the x-coordinate of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the x.</param>
        public DiagramShapeDefaultsSettingsBuilder X(double value)
        {
            container.X = value;

            return this;
        }
        
        /// <summary>
        /// Defines the y-coordinate of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the y.</param>
        public DiagramShapeDefaultsSettingsBuilder Y(double value)
        {
            container.Y = value;

            return this;
        }
        
        /// <summary>
        /// Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.
        /// </summary>
        /// <param name="value">The value that configures the minwidth.</param>
        public DiagramShapeDefaultsSettingsBuilder MinWidth(double value)
        {
            container.MinWidth = value;

            return this;
        }
        
        /// <summary>
        /// Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.
        /// </summary>
        /// <param name="value">The value that configures the minheight.</param>
        public DiagramShapeDefaultsSettingsBuilder MinHeight(double value)
        {
            container.MinHeight = value;

            return this;
        }
        
        /// <summary>
        /// Defines the width of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramShapeDefaultsSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// Defines the height of the shape when added to the diagram.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public DiagramShapeDefaultsSettingsBuilder Height(double value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// Defines the fill-color of the shape.
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public DiagramShapeDefaultsSettingsBuilder Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        /// <summary>
        /// Defines the hover configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the hover.</param>
        public DiagramShapeDefaultsSettingsBuilder Hover(Action<DiagramShapeDefaultsHoverSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeDefaultsHoverSettingsBuilder(container.Hover));
            return this;
        }
        
        /// <summary>
        /// Defines the connectors the shape owns.You can easily define your own custom connectors or mix-match with the above defined custom connectors.Example - custom shape with custom connectorsThe following defines a custom shape with connectors adapted to the shape's outline. Note in particular the various helpful methods (right(), left(), top()) to define positions relative to the shape.
        /// </summary>
        /// <param name="configurator">The action that configures the connectors.</param>
        public DiagramShapeDefaultsSettingsBuilder Connectors(Action<DiagramShapeDefaultsSettingsConnectorFactory> configurator)
        {
            configurator(new DiagramShapeDefaultsSettingsConnectorFactory(container.Connectors));
            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="configurator">The action that configures the rotation.</param>
        public DiagramShapeDefaultsSettingsBuilder Rotation(Action<DiagramShapeDefaultsRotationSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeDefaultsRotationSettingsBuilder(container.Rotation));
            return this;
        }
        
        /// <summary>
        /// Defines the shapes content settings.
        /// </summary>
        /// <param name="configurator">The action that configures the content.</param>
        public DiagramShapeDefaultsSettingsBuilder Content(Action<DiagramShapeDefaultsContentSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeDefaultsContentSettingsBuilder(container.Content));
            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Defines the inline visual template
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        public DiagramShapeDefaultsSettingsBuilder Visual(Func<object, object> inlineCodeBlock)
        {
            container.Visual = new ClientHandlerDescriptor { TemplateDelegate = inlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will create the visual element.
        /// </summary>
        /// <param name="visualHandler">The name of the JavaScript function that will create the visual element.</param>
        public DiagramShapeDefaultsSettingsBuilder Visual(string visualHandler)
        {
            container.Visual = new ClientHandlerDescriptor { HandlerName = visualHandler };

            return this;
        }
    }
}

