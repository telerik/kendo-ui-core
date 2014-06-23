namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGridDataSource"/> component.
    /// </summary>
    public class PivotGridCustomDataSourceBuilder
    {
        protected readonly PivotGridDataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public PivotGridCustomDataSourceBuilder(PivotGridDataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
            this.dataSource.Transport.SerializeEmptyPrefix = false;
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>                
        public PivotGridCustomDataSourceBuilder Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return this;
        }

        /// <summary>
        /// Configures the schema of the Custom DataSource
        /// </summary>
        public PivotGridCustomDataSourceBuilder Schema(Action<PivotGridCustomDataSourceSchemaBuilder> configurator)
        {
            configurator(new PivotGridCustomDataSourceSchemaBuilder((PivotGridDataSourceSchema)dataSource.Schema));

            return this;
        }

        /// <summary>
        /// Configures the transport of the Custom DataSource
        /// </summary>
        public PivotGridCustomDataSourceBuilder Transport(Action<PivotGridCustomDataSourceTransportBuilder> configurator)
        {
            configurator(new PivotGridCustomDataSourceTransportBuilder((PivotGridTransport)dataSource.Transport, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets the columns of the Custom DataSource.
        /// </summary>
        public PivotGridCustomDataSourceBuilder Columns(Action<PivotGridDataSourceColumnFactory> addColumnAction)
        {
            PivotGridDataSourceColumnFactory factory = new PivotGridDataSourceColumnFactory(dataSource.Columns);

            addColumnAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the rows of the Custom DataSource.
        /// </summary>
        public PivotGridCustomDataSourceBuilder Rows(Action<PivotGridDataSourceRowFactory> addRowAction)
        {
            PivotGridDataSourceRowFactory factory = new PivotGridDataSourceRowFactory(dataSource.Rows);

            addRowAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the measures of the Custom DataSource.
        /// </summary>
        public PivotGridCustomDataSourceBuilder Measures(Action<PivotGridDataSourceMeasureBuilder> configurator)
        {
            configurator(new PivotGridDataSourceMeasureBuilder(dataSource.Measure));

            return this;
        }
    }
}
