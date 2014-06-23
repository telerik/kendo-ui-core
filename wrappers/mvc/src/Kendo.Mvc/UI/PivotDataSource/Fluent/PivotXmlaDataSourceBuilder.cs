namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSource"/> component.
    /// </summary>
    public class PivotXmlaDataSourceBuilder : IHideObjectMembers
    {
        protected readonly PivotDataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public PivotXmlaDataSourceBuilder(PivotDataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
            this.dataSource.Transport.SerializeEmptyPrefix = false;
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>                
        public PivotXmlaDataSourceBuilder Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return this;
        }

        /// <summary>
        /// Configures the transport of the Xmla DataSource
        /// </summary>
        public PivotXmlaDataSourceBuilder Transport(Action<PivotDataSourceTransportBuilder> configurator)
        {
            configurator(new PivotDataSourceTransportBuilder((PivotTransport)dataSource.Transport, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets the columns of the Xmla DataSource.
        /// </summary>
        public PivotXmlaDataSourceBuilder Columns(Action<PivotDataSourceColumnFactory> addColumnAction)
        {
            PivotDataSourceColumnFactory factory = new PivotDataSourceColumnFactory(dataSource.Columns);

            addColumnAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the rows of the Xmla DataSource.
        /// </summary>
        public PivotXmlaDataSourceBuilder Rows(Action<PivotDataSourceRowFactory> addRowAction)
        {
            PivotDataSourceRowFactory factory = new PivotDataSourceRowFactory(dataSource.Rows);

            addRowAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the measures of the Xmla DataSource.
        /// </summary>
        public PivotXmlaDataSourceBuilder Measures(Action<PivotDataSourceMeasureBuilder> configurator)
        {
            configurator(new PivotDataSourceMeasureBuilder(dataSource.Measure));

            return this;
        }
    }
}
