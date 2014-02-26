namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Diagram for ASP.NET MVC.
    /// </summary>
    public class DiagramBuilder: WidgetBuilderBase<Diagram, DiagramBuilder>, IHideObjectMembers
    {
        private readonly Diagram container;
        /// <summary>
        /// Initializes a new instance of the <see cref="Diagram"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public DiagramBuilder(Diagram component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
		/// data source is fired. By default the widget will bind to the data source specified in the configuration.
        /// </summary>
        /// <param name="value">The value that configures the autobind.</param>
        public DiagramBuilder AutoBind(bool value)
        {
            container.AutoBind = value;

            return this;
        }
        
        /// <summary>
        /// The scaling factor or the zoom when using the mouse-wheel to zoom in or out. If zoomRate is less than 1, zooming will be reverted. If zoomRate=1, then zooming will appear disabled.
        /// </summary>
        /// <param name="value">The value that configures the zoomrate.</param>
        public DiagramBuilder ZoomRate(double value)
        {
            container.ZoomRate = value;

            return this;
        }
        
        /// <summary>
        /// Defines whether items can be dropped on the diagram.
        /// </summary>
        /// <param name="value">The value that configures the draggable.</param>
        public DiagramBuilder Draggable(bool value)
        {
            container.Draggable = value;

            return this;
        }
        
        /// <summary>
        /// The layout of a diagram consists in arranging the shapes (sometimes also the connections) in some fashion in order to achieve an aesthetically pleasing experience to the user. It aims at giving a more direct insight in the information contained within the diagram and its relational structure.On a technical level, layout consists of a multitude of algorithms and optimizations:and various ad-hoc calculations which depend on the type of layout. The criteria on which an algorithm is based vary but the common denominator is:Kendo diagram includes three of the most used layout algorithms which should cover most of your layout needs - tree layout, force-directed layout and layered layout. Please, check the type property for more details regarding each type.The generic way to apply a layout is by calling the layout() method on the diagram. The method has a single parameter options. It is an object, which can contain parameters which are specific to the layout as well as parameters customizing the global grid layout. Parameters which apply to other layout algorithms can be included but are overlooked if not applicable to the chose layout type. This means that you can define a set of parameters which cover all possible layout types and simply pass it in the method whatever the layout define in the first parameter.
        /// </summary>
        /// <param name="configurator">The action that configures the layout.</param>
        public DiagramBuilder Layout(Action<DiagramLayoutSettingsBuilder> configurator)
        {
            configurator(new DiagramLayoutSettingsBuilder(container.Layout));
            return this;
        }
        
        /// <summary>
        /// The template which renders the content of the shape when bound to a dataSource. The names you can use in the template correspond to the properties used in the dataSource. See the dataSource topic below for a concrete example.
        /// </summary>
        /// <param name="value">The value that configures the templateid.</param>
        public DiagramBuilder TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        /// <summary>
        /// This defines whether the shapes can be resized. If set to false the adorner will not show the resizing thumbs, as can be seen below;
        /// </summary>
        /// <param name="value">The value that configures the resizable.</param>
        public DiagramBuilder Resizable(bool value)
        {
            container.Resizable = value;

            return this;
        }
        
        /// <summary>
        /// This defines whether the shapes can be rotated. If set to false the adorner will not show the rotating thumb, as can be seen below;
        /// </summary>
        /// <param name="value">The value that configures the rotatable.</param>
        public DiagramBuilder Rotatable(bool value)
        {
            container.Rotatable = value;

            return this;
        }
        
        /// <summary>
        /// A function returning a visual element to render for a given dataSource item. The following primitives can be used to construct a composite visual: Should redirect here to a more comprehensive overview of how to use the primitives.
        /// </summary>
        /// <param name="value">The value that configures the visualtemplateid.</param>
        public DiagramBuilder VisualTemplate(string value)
        {
            container.VisualTemplate.HandlerName = value;

            return this;
        }
        
        /// <summary>
        /// Defines the connections configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the connectiondefaults.</param>
        public DiagramBuilder ConnectionDefaults(Action<DiagramConnectionDefaultsSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionDefaultsSettingsBuilder(container.ConnectionDefaults));
            return this;
        }
        
        /// <summary>
        /// Defines the connections configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the connections.</param>
        public DiagramBuilder Connections(Action<DiagramConnectionFactory> configurator)
        {
            configurator(new DiagramConnectionFactory(container.Connections));
            return this;
        }
        
        /// <summary>
        /// Defines the shape options.
        /// </summary>
        /// <param name="configurator">The action that configures the shapedefaults.</param>
        public DiagramBuilder ShapeDefaults(Action<DiagramShapeDefaultsSettingsBuilder> configurator)
        {
            configurator(new DiagramShapeDefaultsSettingsBuilder(container.ShapeDefaults));
            return this;
        }
        
        /// <summary>
        /// Defines the shape options.
        /// </summary>
        /// <param name="configurator">The action that configures the shapes.</param>
        public DiagramBuilder Shapes(Action<DiagramShapeFactory> configurator)
        {
            configurator(new DiagramShapeFactory(container.Shapes));
            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Configure the DataSource of the component
        /// </summary>
        /// <param name="configurator">The action that configures the <see cref="DataSource"/>.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Diagram()
        ///     .Name("diagram")
        ///     .DataSource(dataSource => dataSource
        ///         .Read(read => read
        ///             .Action("_OrgChart", "Diagram")
        ///         )
        ///     )
        ///  %&gt;
        /// </code>
        /// </example>
        public DiagramBuilder DataSource(Action<HierarchicalDataSourceBuilder> configurator)
        {
            configurator(new HierarchicalDataSourceBuilder(Component.DataSource, this.Component.ViewContext, this.Component.urlGenerator));

            return this;
        }
    }
}

