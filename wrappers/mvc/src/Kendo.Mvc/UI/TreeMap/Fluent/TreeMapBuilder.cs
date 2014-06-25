namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo TreeMap for ASP.NET MVC.
    /// </summary>
    public class TreeMapBuilder: WidgetBuilderBase<TreeMap, TreeMapBuilder>
    {
        private readonly TreeMap container;
        /// <summary>
        /// Initializes a new instance of the <see cref="TreeMap"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TreeMapBuilder(TreeMap component)
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
        public TreeMapBuilder AutoBind(bool value)
        {
            container.AutoBind = value;

            return this;
        }
        
        /// <summary>
        /// The data item field which contains the tile value.
        /// </summary>
        /// <param name="value">The value that configures the valuefield.</param>
        public TreeMapBuilder ValueField(string value)
        {
            container.ValueField = value;

            return this;
        }
        
        /// <summary>
        /// The data item field which contains the tile color.
        /// </summary>
        /// <param name="value">The value that configures the colorfield.</param>
        public TreeMapBuilder ColorField(string value)
        {
            container.ColorField = value;

            return this;
        }
        
        /// <summary>
        /// The data item field which contains the tile title.
        /// </summary>
        /// <param name="value">The value that configures the textfield.</param>
        public TreeMapBuilder TextField(string value)
        {
            container.TextField = value;

            return this;
        }
        
        /// <summary>
        /// The template which renders the treeMap tile content.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public TreeMapBuilder Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// The template which renders the treeMap tile content.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public TreeMapBuilder TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The default colors for the treemap tiles. When all colors are used, new colors are pulled from the start again.
        /// </summary>
        /// <param name="value">The value that configures the colors.</param>
        public TreeMapBuilder Colors(params string[] value)
        {
            container.Colors = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Configure the DataSource of the component
        /// </summary>
        /// <param name="configurator">The action that configures the <see cref="DataSource"/>.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeMap()
        ///     .Name("treeMap")
        ///     .DataSource(dataSource => dataSource
        ///         .Read(read => read
        ///             .Action("_PopulationUS", "TreeMap")
        ///         )
        ///     )
        ///  %&gt;
        /// </code>
        /// </example>
        public TreeMapBuilder DataSource(Action<HierarchicalDataSourceBuilder<object>> configurator)
        {
            configurator(new HierarchicalDataSourceBuilder<object>(Component.DataSource, this.Component.ViewContext, this.Component.urlGenerator));

            return this;
        }
        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeMap()
        ///             .Name("TreeMap")
        ///             .Events(events => events
        ///                 .DataBound("onDataBound")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TreeMapBuilder Events(Action<TreeMapEventBuilder> configurator)
        {

            configurator(new TreeMapEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// The default colors for the treemap tiles. When all colors are used, new colors are pulled from the start again.
        /// </summary>
        /// <param name="configurator">The add action.</param>
        public TreeMapBuilder Colors(Action<TreeMapColorRangeFactory> configurator)
        {
            configurator(new TreeMapColorRangeFactory(Component));

            return this;
        }
    }
}

