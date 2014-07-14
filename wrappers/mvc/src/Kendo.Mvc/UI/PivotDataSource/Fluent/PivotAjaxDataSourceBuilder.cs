namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSource"/> component.
    /// </summary>
    public class PivotAjaxDataSourceBuilder<TModel>
        where TModel : class
    {
        protected readonly PivotDataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public PivotAjaxDataSourceBuilder(PivotDataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
            this.dataSource.Schema.Data = "Data";
            this.dataSource.Schema.Total = "Total";
            this.dataSource.Schema.Errors = "Errors";
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>                
        public PivotAjaxDataSourceBuilder<TModel> Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return this;
        }
   
        /// <summary>
        /// Configures the transport of the Ajax DataSource
        /// </summary>
        public PivotAjaxDataSourceBuilder<TModel> Transport(Action<PivotAjaxDataSourceTransportBuilder> configurator)
        {

            //change transport
            configurator(new PivotAjaxDataSourceTransportBuilder((PivotTransport)dataSource.Transport, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets the columns of the Ajax DataSource.
        /// </summary>
        public PivotAjaxDataSourceBuilder<TModel> Columns(Action<PivotDataSourceColumnFactory> addColumnAction)
        {
            PivotDataSourceColumnFactory factory = new PivotDataSourceColumnFactory(dataSource.Columns);

            addColumnAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the rows of the Ajax DataSource.
        /// </summary>
        public PivotAjaxDataSourceBuilder<TModel> Rows(Action<PivotDataSourceRowFactory> addRowAction)
        {
            PivotDataSourceRowFactory factory = new PivotDataSourceRowFactory(dataSource.Rows);

            addRowAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the measures of the Ajax DataSource.
        /// </summary>
        public PivotAjaxDataSourceBuilder<TModel> Measures(Action<PivotDataSourceMeasureBuilder> configurator)
        {
            configurator(new PivotDataSourceMeasureBuilder(dataSource.Measure));

            return this;
        }

        /// <summary>
        /// Configures the schema of the Ajax DataSource
        /// </summary>
        public PivotAjaxDataSourceBuilder<TModel> Schema(Action<PivotAjaxDataSourceSchemaBuilder<TModel>> configurator)
        {
            configurator(new PivotAjaxDataSourceSchemaBuilder<TModel>((PivotDataSourceSchema)dataSource.Schema));

            return this;
        }
    }
}
