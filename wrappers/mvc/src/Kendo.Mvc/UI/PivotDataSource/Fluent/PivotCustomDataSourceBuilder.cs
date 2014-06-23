namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSource"/> component.
    /// </summary>
    public class PivotCustomDataSourceBuilder
    {
        protected readonly PivotDataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public PivotCustomDataSourceBuilder(PivotDataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
            this.dataSource.Transport.SerializeEmptyPrefix = false;
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>                
        public PivotCustomDataSourceBuilder Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return this;
        }

        /// <summary>
        /// Configures the schema of the Custom DataSource
        /// </summary>
        public PivotCustomDataSourceBuilder Schema(Action<PivotCustomDataSourceSchemaBuilder> configurator)
        {
            configurator(new PivotCustomDataSourceSchemaBuilder((PivotDataSourceSchema)dataSource.Schema));

            return this;
        }

        /// <summary>
        /// Configures the transport of the Custom DataSource
        /// </summary>
        public PivotCustomDataSourceBuilder Transport(Action<PivotCustomDataSourceTransportBuilder> configurator)
        {
            configurator(new PivotCustomDataSourceTransportBuilder((PivotTransport)dataSource.Transport, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets the columns of the Custom DataSource.
        /// </summary>
        public PivotCustomDataSourceBuilder Columns(Action<PivotDataSourceColumnFactory> addColumnAction)
        {
            PivotDataSourceColumnFactory factory = new PivotDataSourceColumnFactory(dataSource.Columns);

            addColumnAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the rows of the Custom DataSource.
        /// </summary>
        public PivotCustomDataSourceBuilder Rows(Action<PivotDataSourceRowFactory> addRowAction)
        {
            PivotDataSourceRowFactory factory = new PivotDataSourceRowFactory(dataSource.Rows);

            addRowAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the measures of the Custom DataSource.
        /// </summary>
        public PivotCustomDataSourceBuilder Measures(Action<PivotDataSourceMeasureBuilder> configurator)
        {
            configurator(new PivotDataSourceMeasureBuilder(dataSource.Measure));

            return this;
        }
    }
}
