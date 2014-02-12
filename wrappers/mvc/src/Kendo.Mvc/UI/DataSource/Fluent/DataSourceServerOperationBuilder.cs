namespace Kendo.Mvc.UI.Fluent
{
    public class DataSourceServerOperationBuilder : IHideObjectMembers
    {
        private readonly DataSource dataSource;

        public DataSourceServerOperationBuilder(DataSource dataSource)
        {
            this.dataSource = dataSource;
        }

        /// <summary>
        /// Sets the paging operation mode of the DataSource. 
        /// By default the DataSource will make a request to the server when data for paging is needed. 
        /// If set to false all data will be requested through single request. 
        /// Any other paging will be performed client-side.
        /// </summary>
        /// <param name="enabled">True(default) if server operation mode is enabled, otherwise false.</param>
        public DataSourceServerOperationBuilder ServerPaging(bool enabled)
        {
            dataSource.ServerPaging = enabled;

            return this;
        }

        /// <summary>
        /// Sets the filtering operation mode of the DataSource. 
        /// By default the DataSource will make a request to the server when data for filtering is needed. 
        /// If set to false all data will be requested through single request. 
        /// Any other filtering will be performed client-side.
        /// </summary>
        /// <param name="enabled">True(default) if server operation mode is enabled, otherwise false.</param>
        public DataSourceServerOperationBuilder ServerFiltering(bool enabled)
        {
            dataSource.ServerFiltering = enabled;

            return this;
        }

        /// <summary>
        /// Sets the aggregates operation mode of the DataSource. 
        /// By default the DataSource will make a request to the server when data for aggregates is needed. 
        /// If set to false all data will be requested through single request. 
        /// Any other aggregates will be performed client-side.
        /// </summary>
        /// <param name="enabled">True(default) if server operation mode is enabled, otherwise false.</param>
        public DataSourceServerOperationBuilder ServerAggregates(bool enabled)
        {
            dataSource.ServerAggregates = enabled;

            return this;
        }

        /// <summary>
        /// Sets the sorting operation mode of the DataSource. 
        /// By default the DataSource will make a request to the server when data for sorting is needed. 
        /// If set to false all data will be requested through single request. 
        /// Any other sorting will be performed client-side.
        /// </summary>
        /// <param name="enabled">True(default) if server operation mode is enabled, otherwise false.</param>
        public DataSourceServerOperationBuilder ServerSorting(bool enabled)
        {
            dataSource.ServerSorting = enabled;

            return this;
        }

        /// <summary>
        /// Sets the grouping operation mode of the DataSource. 
        /// By default the DataSource will make a request to the server when data for grouping is needed. 
        /// If set to false all data will be requested through single request. 
        /// Any other grouping will be performed client-side.
        /// </summary>
        /// <param name="enabled">True(default) if server operation mode is enabled, otherwise false.</param>
        public DataSourceServerOperationBuilder ServerGrouping(bool enabled)
        {
            dataSource.ServerGrouping = enabled;

            return this;
        }
    }
}
