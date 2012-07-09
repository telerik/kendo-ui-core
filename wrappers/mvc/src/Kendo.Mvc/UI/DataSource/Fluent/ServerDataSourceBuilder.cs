using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public class ServerDataSourceBuilder<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly DataSource dataSource;
        private readonly IUrlGenerator urlGenerator;
        private readonly ViewContext viewContext;

        public ServerDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        /// <summary>
        /// Configures the URL for Read operation.
        /// </summary> 
        public ServerDataSourceBuilder<TModel> Read(Action<ServerCrudOperationBuilder> configurator)
        {
            configurator(new ServerCrudOperationBuilder(dataSource.Transport.Read, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>    
        public ServerDataSourceBuilder<TModel> Read(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public ServerDataSourceBuilder<TModel> Read(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Sets the total number of records in the data source. Required during Custom binding.
        /// </summary>
        /// <param name="total">Number of records</param>
        public ServerDataSourceBuilder<TModel> Total(int total)
        {
            dataSource.Total = total;

            return this;
        }

        /// <summary>
        /// Configures the URL for Update operation.
        /// </summary>   
        public ServerDataSourceBuilder<TModel> Update(Action<ServerCrudOperationBuilder> configurator)
        {
            configurator(new ServerCrudOperationBuilder(dataSource.Transport.Update, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Update operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        public ServerDataSourceBuilder<TModel> Update(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Update, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Update operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public ServerDataSourceBuilder<TModel> Update(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Update, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Configures the URL for Create operation.
        /// </summary> 
        public ServerDataSourceBuilder<TModel> Create(Action<ServerCrudOperationBuilder> configurator)
        {
            configurator(new ServerCrudOperationBuilder(dataSource.Transport.Create, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Create operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        public ServerDataSourceBuilder<TModel> Create(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Create, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Create operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public ServerDataSourceBuilder<TModel> Create(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Create, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Configures the URL for Destroy operation.
        /// </summary>
        public ServerDataSourceBuilder<TModel> Destroy(Action<ServerCrudOperationBuilder> configurator)
        {
            configurator(new ServerCrudOperationBuilder(dataSource.Transport.Destroy, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Destroy operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>    
        public ServerDataSourceBuilder<TModel> Destroy(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Destroy, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Destroy operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public ServerDataSourceBuilder<TModel> Destroy(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Destroy, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Sets the number of records displayed on a single page.
        /// </summary>
        /// <param name="pageSize"></param>
        public ServerDataSourceBuilder<TModel> PageSize(int pageSize)
        {
            dataSource.PageSize = pageSize;
            return this;
        }

        /// <summary>
        /// Configures the initial sorting.
        /// </summary>      
        public virtual ServerDataSourceBuilder<TModel> Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceSortDescriptorFactory<TModel>(dataSource.OrderBy));

            return this;
        }

        /// <summary>
        /// Configures the initial grouping.
        /// </summary>
        public ServerDataSourceBuilder<TModel> Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceGroupDescriptorFactory<TModel>(dataSource.Groups));

            return this;
        }

        /// <summary>
        /// Configures the initial aggregates.
        /// </summary>
        public ServerDataSourceBuilder<TModel> Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {
            aggregates(new DataSourceAggregateDescriptorFactory<TModel>(dataSource.Aggregates));

            return this;
        }

        /// <summary>
        /// Configures the initial filter.
        /// </summary>
        public virtual ServerDataSourceBuilder<TModel> Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceFilterDescriptorFactory<TModel>(dataSource.Filters));

            return this;
        }

        /// <summary>
        /// Configures Model properties
        /// </summary> 
        public ServerDataSourceBuilder<TModel> Model(Action<DataSourceModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceModelDescriptorFactory<TModel>(dataSource.Schema.Model));

            return this;
        }

        protected virtual void SetOperationUrl(CrudOperation operation, string actionName, string controllerName, object routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
