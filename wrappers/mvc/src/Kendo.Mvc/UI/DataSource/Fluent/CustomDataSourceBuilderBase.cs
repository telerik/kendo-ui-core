namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;

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
            this.dataSource.ServerPaging = false;
            this.dataSource.ServerSorting = false;
            this.dataSource.ServerGrouping = false;
            this.dataSource.ServerFiltering = false;
            this.dataSource.ServerAggregates = false;
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
        /// Enables or disables server paging mode. If enabled the data source will make a request during paging.
        /// </summary>
        /// <param name="enabled">True to enable server paging; otherwise false (the default).</param>
        public TCustomDataSourceBuilder ServerPaging(bool enabled)
        {
            dataSource.ServerPaging = enabled;

            return (TCustomDataSourceBuilder)this;
        }

        /// <summary>
        /// Enables or disables server sorting mode. If enabled the data source will make a request during paging.
        /// </summary>
        /// <param name="enabled">True to enable server sorting; otherwise false (the default).</param>
        public TCustomDataSourceBuilder ServerSorting(bool enabled)
        {
            dataSource.ServerSorting = enabled;

            return (TCustomDataSourceBuilder)this;
        }

        /// <summary>
        /// Enables or disables server filtering mode. If enabled the data source will make a request during filtering.
        /// </summary>
        /// <param name="enabled">True to enable server filtering; otherwise false (the default).</param>
        public TCustomDataSourceBuilder ServerFiltering(bool enabled)
        {
            dataSource.ServerFiltering = enabled;

            return (TCustomDataSourceBuilder)this;
        }

        /// <summary>
        /// Enables or disables server grouping mode. If enabled the data source will make a request during grouping.
        /// </summary>
        /// <param name="enabled">True to enable server grouping; otherwise false (the default).</param>
        public TCustomDataSourceBuilder ServerGrouping(bool enabled)
        {
            dataSource.ServerGrouping = enabled;

            return (TCustomDataSourceBuilder)this;
        }

        /// <summary>
        /// Enables or disables server aggregates. If enabled the data source will expect the aggregates to be calculated server-side.
        /// </summary>
        /// <param name="enabled">True to enable server aggregates; otherwise false (the default).</param>
        public TCustomDataSourceBuilder ServerAggregates(bool enabled)
        {
            dataSource.ServerAggregates = enabled;

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

        /// <summary>
        /// Sets the transport of the DataSource using anonymous object.
        /// </summary>
        public TCustomDataSourceBuilder Transport(object settings)
        {

            var json = new Dictionary<string, object>();
            json.Merge(settings);

            dataSource.CustomTransport = json;

            return (TCustomDataSourceBuilder)this;
        }
    }
}
