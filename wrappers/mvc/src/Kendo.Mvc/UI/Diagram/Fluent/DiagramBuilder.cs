namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Diagram for ASP.NET MVC.
    /// </summary>
    public class DiagramBuilder<TShapeModel, TConnectionModel> : WidgetBuilderBase<Diagram<TShapeModel, TConnectionModel>, DiagramBuilder<TShapeModel, TConnectionModel>>, IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly Diagram<TShapeModel, TConnectionModel> container;
        /// <summary>
        /// Initializes a new instance of the <see cref="Diagram"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public DiagramBuilder(Diagram<TShapeModel, TConnectionModel> component)
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
        public DiagramBuilder<TShapeModel,TConnectionModel> AutoBind(bool value)
        {
            container.AutoBind = value;

            return this;
        }
        
        /// <summary>
        /// Defines the defaults of the connections. Whenever a connection is created, the specified connectionDefaults will be used and merged with the (optional) configuration passed through the connection creation method.
        /// </summary>
        /// <param name="configurator">The action that configures the connectiondefaults.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> ConnectionDefaults(Action<DiagramConnectionDefaultsSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDefaultsSettingsBuilder<TShapeModel,TConnectionModel>(container.ConnectionDefaults));
            return this;
        }
        
        /// <summary>
        /// Defines the connections configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the connections.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Connections(Action<DiagramConnectionFactory<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionFactory<TShapeModel,TConnectionModel>(container.Connections));
            return this;
        }
        

        /// <summary>
        /// Defines how the diagram behaves when the user attempts to edit shape content, create new connections, edit connection labels and so on.
        /// </summary>
        /// <param name="enabled">Enables or disables the editable option.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Editable(bool enabled)
        {
            container.Editable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// Defines how the diagram behaves when the user attempts to edit shape content, create new connections, edit connection labels and so on.
        /// </summary>
        /// <param name="configurator">The action that configures the editable.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Editable(Action<DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            container.Editable.Enabled = true;
            
            configurator(new DiagramEditableSettingsBuilder<TShapeModel,TConnectionModel>(container.Editable));
            return this;
        }
        
        /// <summary>
        /// The layout of a diagram consists in arranging the shapes (sometimes also the connections) in some fashion in order to achieve an aesthetically pleasing experience to the user. It aims at giving a more direct insight in the information contained within the diagram and its relational structure.On a technical level, layout consists of a multitude of algorithms and optimizations:and various ad-hoc calculations which depend on the type of layout. The criteria on which an algorithm is based vary but the common denominator is:Kendo diagram includes three of the most used layout algorithms which should cover most of your layout needs - tree layout, force-directed layout and layered layout. Please, check the type property for more details regarding each type.The generic way to apply a layout is by calling the layout() method on the diagram. The method has a single parameter options. It is an object, which can contain parameters which are specific to the layout as well as parameters customizing the global grid layout. Parameters which apply to other layout algorithms can be included but are overlooked if not applicable to the chose layout type. This means that you can define a set of parameters which cover all possible layout types and simply pass it in the method whatever the layout define in the first parameter.
        /// </summary>
        /// <param name="configurator">The action that configures the layout.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Layout(Action<DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramLayoutSettingsBuilder<TShapeModel,TConnectionModel>(container.Layout));
            return this;
        }
        

        /// <summary>
        /// Defines the pannable options.
        /// </summary>
        /// <param name="enabled">Enables or disables the pannable option.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Pannable(bool enabled)
        {
            container.Pannable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// Defines the pannable options.
        /// </summary>
        /// <param name="configurator">The action that configures the pannable.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Pannable(Action<DiagramPannableSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            container.Pannable.Enabled = true;
            
            configurator(new DiagramPannableSettingsBuilder<TShapeModel,TConnectionModel>(container.Pannable));
            return this;
        }
        
        /// <summary>
        /// Configures the export settings for the saveAsPDF method.
        /// </summary>
        /// <param name="configurator">The action that configures the pdf.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Pdf(Action<DiagramPdfSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramPdfSettingsBuilder<TShapeModel,TConnectionModel>(container.Pdf));
            return this;
        }
        

        /// <summary>
        /// Defines the selectable options.
        /// </summary>
        /// <param name="enabled">Enables or disables the selectable option.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Selectable(bool enabled)
        {
            container.Selectable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// Defines the selectable options.
        /// </summary>
        /// <param name="configurator">The action that configures the selectable.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Selectable(Action<DiagramSelectableSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            container.Selectable.Enabled = true;
            
            configurator(new DiagramSelectableSettingsBuilder<TShapeModel,TConnectionModel>(container.Selectable));
            return this;
        }
        
        /// <summary>
        /// Defines the shape options.
        /// </summary>
        /// <param name="configurator">The action that configures the shapedefaults.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> ShapeDefaults(Action<DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeDefaultsSettingsBuilder<TShapeModel,TConnectionModel>(container.ShapeDefaults));
            return this;
        }
        
        /// <summary>
        /// Defines the shape options.
        /// </summary>
        /// <param name="configurator">The action that configures the shapes.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Shapes(Action<DiagramShapeFactory<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramShapeFactory<TShapeModel,TConnectionModel>(container.Shapes));
            return this;
        }
        
        /// <summary>
        /// The template which renders the content of the shape when bound to a dataSource. The names you can use in the template correspond to the properties used in the dataSource. See the dataSource topic below for a concrete example.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// The template which renders the content of the shape when bound to a dataSource. The names you can use in the template correspond to the properties used in the dataSource. See the dataSource topic below for a concrete example.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The zoom level in percentages.
        /// </summary>
        /// <param name="value">The value that configures the zoom.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> Zoom(double value)
        {
            container.Zoom = value;

            return this;
        }
        
        /// <summary>
        /// The zoom max level in percentages.
        /// </summary>
        /// <param name="value">The value that configures the zoommax.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> ZoomMax(double value)
        {
            container.ZoomMax = value;

            return this;
        }
        
        /// <summary>
        /// The zoom min level in percentages.
        /// </summary>
        /// <param name="value">The value that configures the zoommin.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> ZoomMin(double value)
        {
            container.ZoomMin = value;

            return this;
        }
        
        /// <summary>
        /// The zoom step when using the mouse-wheel to zoom in or out.
        /// </summary>
        /// <param name="value">The value that configures the zoomrate.</param>
        public DiagramBuilder<TShapeModel,TConnectionModel> ZoomRate(double value)
        {
            container.ZoomRate = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Configure the HierarchicalDataSource of the component
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
        public DiagramBuilder<TShapeModel, TConnectionModel> DataSource(Action<DiagramDataSourceBuilder<TShapeModel>> configurator)
        {
            configurator(new DiagramDataSourceBuilder<TShapeModel>(Component.DataSource, this.Component.ViewContext, this.Component.urlGenerator));

            return this;
        }

        /// <summary>
        /// Configure the DataSource of the component
        /// </summary>
        /// <param name="configurator">The action that configures the <see cref="ConnectionsDataSource"/>.</param>
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
        public DiagramBuilder<TShapeModel, TConnectionModel> ConnectionsDataSource(Action<DiagramConnectionDataSourceBuilder<TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDataSourceBuilder<TConnectionModel>(Component.ConnectionsDataSource, this.Component.ViewContext, this.Component.urlGenerator));

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Diagram()
        ///             .Name("diagram")
        ///             .Events(events => events
        ///                 .Click("onClick")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public DiagramBuilder<TShapeModel, TConnectionModel> Events(Action<DiagramEventBuilder> configurator)
        {
            configurator(new DiagramEventBuilder(Component.Events));

            return this;
        }
    }
}

