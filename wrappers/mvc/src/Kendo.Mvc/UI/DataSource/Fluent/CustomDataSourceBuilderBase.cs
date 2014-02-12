namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    public abstract class CustomDataSourceBuilderBase<TCustomDataSourceBuilder> : IHideObjectMembers
        where TCustomDataSourceBuilder : CustomDataSourceBuilderBase<TCustomDataSourceBuilder>
    {
        protected readonly DataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public CustomDataSourceBuilderBase(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>                
        public TCustomDataSourceBuilder Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return (TCustomDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets the total number of records in the data source. Required during Custom binding.
        /// </summary>
        /// <param name="total">Number of records</param>
        public TCustomDataSourceBuilder Total(int total)
        {
            dataSource.Total = total;

            return (TCustomDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets the number of records displayed on a single page.
        /// </summary>
        /// <param name="pageSize"></param>
        public TCustomDataSourceBuilder PageSize(int pageSize)
        {
            dataSource.PageSize = pageSize;
            return (TCustomDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets the page of the DataSource.
        /// </summary>
        /// <param name="page"></param>
        public TCustomDataSourceBuilder Page(int page)
        {
            dataSource.Page = page;
            return (TCustomDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets the operation mode of the DataSource. 
        /// By default the DataSource will make a request to the server when data for paging, sorting, 
        /// filtering or grouping is needed. If set to false all data will be requested through single request. 
        /// Any other paging, sorting, filtering or grouping will be performed client-side.
        /// </summary>
        /// <param name="enabled">True(default) if server operation mode is enabled, otherwise false.</param>
        public TCustomDataSourceBuilder ServerOperation(bool enabled)
        {
            dataSource.ServerPaging = enabled;
            dataSource.ServerFiltering = enabled;
            dataSource.ServerAggregates = enabled;
            dataSource.ServerSorting = enabled;
            dataSource.ServerGrouping = enabled;

            return (TCustomDataSourceBuilder)this;
        }

        /// <summary>
        /// Configures the operation modes of the DataSource.
        /// </summary>   
        public TCustomDataSourceBuilder ServerOperation(Action<DataSourceServerOperationBuilder> configurator)
        {
            configurator(new DataSourceServerOperationBuilder(dataSource));

            return (TCustomDataSourceBuilder)this;
        }

        /// <summary>
        /// Determines if modifications will be sent to the server in batches or as individually requests.
        /// </summary>
        /// <param name="enabled">If true changes will be batched, otherwise false.</param>
        public virtual TCustomDataSourceBuilder Batch(bool enabled)
        {
            dataSource.Batch = enabled;

            return (TCustomDataSourceBuilder)this;
        }

        /// <summary>
        /// Determines if data source would automatically sync any changes to its data items. By default changes are not automatically sync-ed.
        /// </summary>
        /// <param name="enabled">If true changes will be automatically synced, otherwise false.</param>
        public virtual TCustomDataSourceBuilder AutoSync(bool enabled)
        {
            dataSource.AutoSync = enabled;

            return (TCustomDataSourceBuilder)this;
        }
    }
}
