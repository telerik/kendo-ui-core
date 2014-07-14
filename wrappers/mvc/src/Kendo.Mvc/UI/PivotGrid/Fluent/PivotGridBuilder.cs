namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGrid"/>.
    /// </summary>
    public class PivotGridBuilder<TModel> : WidgetBuilderBase<PivotGrid, PivotGridBuilder<TModel>>
        where TModel : class
    {
        // <summary>
        /// Initializes a new instance of the <see cref="PivotGridBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public PivotGridBuilder(PivotGrid component)
            : base(component)
        {
        }

        /// <summary>
        /// If set to false the initial binding will be prevented.
        /// </summary>
        /// <param name="autoBind">The autoBind</param>
        public PivotGridBuilder<TModel> AutoBind(bool autoBind)
        {
            Component.AutoBind = autoBind;

            return this;
        }

        /// <summary>
        /// Use it to set the Id of the PivotConfigurator.
        /// </summary>
        /// <param name="configurator">The configurator</param>
        public PivotGridBuilder<TModel> Configurator(string configurator)
        {
            Component.Configurator = configurator;

            return this;
        }

        /// <summary>
        /// Use it to set the column width of the Pivot.
        /// </summary>
        /// <param name="columnWidth">The column width.</param>
        public PivotGridBuilder<TModel> ColumnWidth(int columnWidth)
        {
            Component.ColumnWidth = columnWidth;

            return this;
        }

        /// <summary>
        /// Use it to set the height of the Pivot.
        /// </summary>
        /// <param name="height">The height</param>
        public PivotGridBuilder<TModel> Height(int height)
        {
            Component.Height = height;

            return this;
        }

        /// <summary>
        /// If set to false the user will not be able to add/close/reorder current fields for columns/rows/measures.
        /// </summary>
        /// <param name="reorderable">The reorderable</param>
        public PivotGridBuilder<TModel> Reorderable(bool reorderable)
        {
            Component.Reorderable = reorderable;

            return this;
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>
        public PivotGridBuilder<TModel> Events(Action<PivotGridEventBuilder> configurator)
        {
            configurator(new PivotGridEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Sets the data source configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the data source</param>
        public PivotGridBuilder<TModel> DataSource(Action<PivotDataSourceBuilder<TModel>> configurator)
        {
            configurator(new PivotDataSourceBuilder<TModel>(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }

        /// <summary>
        /// Binds the pivotGrid to a list of objects
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        public PivotGridBuilder<TModel> BindTo(IEnumerable<TModel> dataSource)
        {
            Component.DataSource.Data = dataSource;

            return this;
        }
    }
}
