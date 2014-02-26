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
        /// Specifies if the shape is editable by the user.
        /// </summary>
        /// <param name="value">The value that configures the editable.</param>
        public DiagramShapeDefaultsSettingsBuilder Editable(bool value)
        {
            container.Editable = value;

            return this;
        }
        
        /// <summary>
        /// Specifies if the user is allowed to rotate the shape.
        /// </summary>
        /// <param name="value">The value that configures the rotatable.</param>
        public DiagramShapeDefaultsSettingsBuilder Rotatable(bool value)
        {
            container.Rotatable = value;

            return this;
        }
        
        /// <summary>
        /// Specifies if the shape is resizable.
        /// </summary>
        /// <param name="value">The value that configures the resizable.</param>
        public DiagramShapeDefaultsSettingsBuilder Resizable(bool value)
        {
            container.Resizable = value;

            return this;
        }
        
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
        /// 
        /// </summary>
        /// <param name="configurator">The action that configures the rotation.</param>
        public DiagramShapeDefaultsSettingsBuilder Rotation(Action<DiagramShapeDefaultsRotationSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeDefaultsRotationSettingsBuilder(container.Rotation));
            return this;
        }
        
        /// <summary>
        /// Sets the text content of the Shape.
        /// </summary>
        /// <param name="value">The value that configures the content.</param>
        public DiagramShapeDefaultsSettingsBuilder Content(string value)
        {
            container.Content = value;

            return this;
        }
        
        //<< Fields
    }
}

