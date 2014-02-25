namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Extensions;
    using System;
    using System.Collections.Generic;

    public abstract class SignalRDataSourceBuilderBase<TSignalRDataSourceBuilder> : IHideObjectMembers
        where TSignalRDataSourceBuilder : SignalRDataSourceBuilderBase<TSignalRDataSourceBuilder>
    {
        protected readonly DataSource dataSource;

        public SignalRDataSourceBuilderBase(DataSource dataSource)
        {
            this.dataSource = dataSource;
            this.dataSource.ServerPaging = false;
            this.dataSource.ServerSorting = false;
            this.dataSource.ServerGrouping = false;
            this.dataSource.ServerFiltering = false;
            this.dataSource.ServerAggregates = false;
            this.dataSource.CustomType = "signalr";
            this.dataSource.Schema.Data = "";
            this.dataSource.Schema.Total = "";
            this.dataSource.Schema.Errors = "";
            this.dataSource.Transport.SerializeEmptyPrefix = false;
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>                
        public TSignalRDataSourceBuilder Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return (TSignalRDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets the total number of records in the data source. Required during Custom binding.
        /// </summary>
        /// <param name="total">Number of records</param>
        public TSignalRDataSourceBuilder Total(int total)
        {
            dataSource.Total = total;

            return (TSignalRDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets the number of records displayed on a single page.
        /// </summary>
        /// <param name="pageSize"></param>
        public TSignalRDataSourceBuilder PageSize(int pageSize)
        {
            dataSource.PageSize = pageSize;
            return (TSignalRDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets the page of the DataSource.
        /// </summary>
        /// <param name="page"></param>
        public TSignalRDataSourceBuilder Page(int page)
        {
            dataSource.Page = page;
            return (TSignalRDataSourceBuilder)this;
        }

        /// <summary>
        /// Enables or disables server paging mode. If enabled the data source will make a request during paging.
        /// </summary>
        /// <param name="enabled">True to enable server paging; otherwise false (the default).</param>
        public TSignalRDataSourceBuilder ServerPaging(bool enabled)
        {
            dataSource.ServerPaging = enabled;

            return (TSignalRDataSourceBuilder)this;
        }

        /// <summary>
        /// Enables or disables server sorting mode. If enabled the data source will make a request during paging.
        /// </summary>
        /// <param name="enabled">True to enable server sorting; otherwise false (the default).</param>
        public TSignalRDataSourceBuilder ServerSorting(bool enabled)
        {
            dataSource.ServerSorting = enabled;

            return (TSignalRDataSourceBuilder)this;
        }

        /// <summary>
        /// Enables or disables server filtering mode. If enabled the data source will make a request during filtering.
        /// </summary>
        /// <param name="enabled">True to enable server filtering; otherwise false (the default).</param>
        public TSignalRDataSourceBuilder ServerFiltering(bool enabled)
        {
            dataSource.ServerFiltering = enabled;

            return (TSignalRDataSourceBuilder)this;
        }

        /// <summary>
        /// Enables or disables server grouping mode. If enabled the data source will make a request during grouping.
        /// </summary>
        /// <param name="enabled">True to enable server grouping; otherwise false (the default).</param>
        public TSignalRDataSourceBuilder ServerGrouping(bool enabled)
        {
            dataSource.ServerGrouping = enabled;

            return (TSignalRDataSourceBuilder)this;
        }

        /// <summary>
        /// Enables or disables server aggregates. If enabled the data source will expect the aggregates to be calculated server-side.
        /// </summary>
        /// <param name="enabled">True to enable server aggregates; otherwise false (the default).</param>
        public TSignalRDataSourceBuilder ServerAggregates(bool enabled)
        {
            dataSource.ServerAggregates = enabled;

            return (TSignalRDataSourceBuilder)this;
        }

        /// <summary>
        /// Determines if modifications will be sent to the server in batches or as individually requests.
        /// </summary>
        /// <param name="enabled">If true changes will be batched, otherwise false.</param>
        public virtual TSignalRDataSourceBuilder Batch(bool enabled)
        {
            dataSource.Batch = enabled;

            return (TSignalRDataSourceBuilder)this;
        }

        /// <summary>
        /// Determines if data source would automatically sync any changes to its data items. By default changes are not automatically sync-ed.
        /// </summary>
        /// <param name="enabled">If true changes will be automatically synced, otherwise false.</param>
        public virtual TSignalRDataSourceBuilder AutoSync(bool enabled)
        {
            dataSource.AutoSync = enabled;

            return (TSignalRDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets the transport of the DataSource using anonymous object.
        /// </summary>
        public TSignalRDataSourceBuilder Transport(object settings)
        {

            var json = new Dictionary<string, object>();
            json.Merge(settings);

            dataSource.CustomTransport = json;

            return (TSignalRDataSourceBuilder)this;
        }
    }
}
