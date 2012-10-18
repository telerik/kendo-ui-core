using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>    
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> options.
    /// </summary>    
    public abstract class AjaxDataSourceBuilderBase<TModel, TDataSourceBuilder> : IHideObjectMembers
        where TModel : class
        where TDataSourceBuilder : AjaxDataSourceBuilderBase<TModel, TDataSourceBuilder>
    {
        protected readonly DataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public AjaxDataSourceBuilderBase(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>                
        public TDataSourceBuilder Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Configures the URL for Read operation.
        /// </summary> 
        public TDataSourceBuilder Read(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Read, viewContext, urlGenerator));

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets controller and action for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public TDataSourceBuilder Read(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, routeValues);

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public TDataSourceBuilder Read(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, null);

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets the total number of records in the data source. Required during Custom binding.
        /// </summary>
        /// <param name="total">Number of records</param>        
        public TDataSourceBuilder Total(int total)
        {
            dataSource.Total = total;

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets the number of records displayed on a single page.
        /// </summary>
        /// <param name="pageSize"></param>        
        public TDataSourceBuilder PageSize(int pageSize)
        {
            dataSource.PageSize = pageSize;
            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets the operation mode of the DataSource. 
        /// By default the DataSource will make a request to the server when data for paging, sorting, 
        /// filtering or grouping is needed. If set to false all data will be requested through single request. 
        /// Any other paging, sorting, filtering or grouping will be performed client-side.
        /// </summary>
        /// <param name="enabled">True(default) if server operation mode is enabled, otherwise false.</param>        
        public TDataSourceBuilder ServerOperation(bool enabled)
        {
            dataSource.ServerPaging = enabled;
            dataSource.ServerFiltering = enabled;
            dataSource.ServerAggregates = enabled;
            dataSource.ServerSorting = enabled;
            dataSource.ServerGrouping = enabled;

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Configures the initial sorting.
        /// </summary>        
        public virtual TDataSourceBuilder Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceSortDescriptorFactory<TModel>(dataSource.OrderBy));

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Configures the initial grouping.
        /// </summary>
        public TDataSourceBuilder Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceGroupDescriptorFactory<TModel>(dataSource.Groups));

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Configures the initial aggregates.
        /// </summary>
        public TDataSourceBuilder Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {

            aggregates(new DataSourceAggregateDescriptorFactory<TModel>(dataSource.Aggregates));

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Configures the initial filter.
        /// </summary>
        public virtual TDataSourceBuilder Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceFilterDescriptorFactory<TModel>(dataSource.Filters));

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>                
        public virtual TDataSourceBuilder Model(Action<DataSourceModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceModelDescriptorFactory<TModel>(dataSource.Schema.Model));

            return (TDataSourceBuilder)this;
        }

        protected virtual void SetOperationUrl(CrudOperation operation, string actionName, string controllerName, object routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
