namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGridDataSource"/> component.
    /// </summary>
    public class PivotGridXmlaDataSourceBuilder : IHideObjectMembers
    {
        protected readonly PivotGridDataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public PivotGridXmlaDataSourceBuilder(PivotGridDataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
            this.dataSource.Schema.Data = "";
            this.dataSource.Schema.Total = "";
            this.dataSource.Schema.Errors = "";
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>                
        public PivotGridXmlaDataSourceBuilder Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return this;
        }

        /// <summary>
        /// Configures the transport of the Xmla DataSource
        /// </summary>
        public PivotGridXmlaDataSourceBuilder Transport(Action<PivotGridDataSourceTransportBuilder> configurator)
        {
            configurator(new PivotGridDataSourceTransportBuilder((PivotGridTransport)dataSource.Transport, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets the columns of the Xmla DataSource.
        /// </summary>
        public PivotGridXmlaDataSourceBuilder Columns(Action<PivotGridDataSourceColumnFactory> addColumnAction)
        {
            PivotGridDataSourceColumnFactory factory = new PivotGridDataSourceColumnFactory(dataSource.Columns);

            addColumnAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the rows of the Xmla DataSource.
        /// </summary>
        public PivotGridXmlaDataSourceBuilder Rows(Action<PivotGridDataSourceRowFactory> addRowAction)
        {
            PivotGridDataSourceRowFactory factory = new PivotGridDataSourceRowFactory(dataSource.Rows);

            addRowAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the measures of the Xmla DataSource.
        /// </summary>
        public PivotGridXmlaDataSourceBuilder Measures(Action<PivotGridDataSourceMeasureBuilder> configurator)
        {
            configurator(new PivotGridDataSourceMeasureBuilder(dataSource.Measure));

            return this;
        }
    }
}
