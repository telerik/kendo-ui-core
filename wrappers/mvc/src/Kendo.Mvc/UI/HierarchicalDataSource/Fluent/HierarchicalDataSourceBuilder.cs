namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="HierarchicalDataSource"/>.
    /// </summary>
    public class HierarchicalDataSourceBuilder<TModel> : IHideObjectMembers
        where TModel: class
    {
        private readonly DataSource dataSource;
        private readonly IUrlGenerator urlGenerator;
        private readonly ViewContext viewContext;

        public HierarchicalDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.dataSource = dataSource;
            this.urlGenerator = urlGenerator;
            this.viewContext = viewContext;
            this.dataSource.ServerPaging = false;
            this.dataSource.ServerSorting = false;
            this.dataSource.ServerGrouping = false;
            this.dataSource.ServerFiltering = false;
            this.dataSource.ServerAggregates = false;
            this.dataSource.Schema.Data = "";
            this.dataSource.Schema.Total = "";
            this.dataSource.Schema.Errors = "";
            this.dataSource.Transport.SerializeEmptyPrefix = false;
        }

        /// <summary>
        /// Use it to configure Custom binding.
        /// </summary>
        public CustomHierarchicalDataSourceBuilder Custom()
        {
            dataSource.Type = DataSourceType.Custom;

            return new CustomHierarchicalDataSourceBuilder(dataSource, viewContext, urlGenerator);
        }

        /// <summary>
        /// Use it to configure SignalR binding.
        /// </summary>
        public SignalRHierarchicalDataSourceBuilder SignalR()
        {
            dataSource.Type = DataSourceType.Custom;

            return new SignalRHierarchicalDataSourceBuilder(dataSource);
        }

        /// <summary>
        /// Configures the URL for Read operation.
        /// </summary> 
        public HierarchicalDataSourceBuilder<TModel> Read(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Read, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public HierarchicalDataSourceBuilder<TModel> Read(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets controller and action for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public HierarchicalDataSourceBuilder<TModel> Read(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>  
        public HierarchicalDataSourceBuilder<TModel> Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return this;
        }

        /// <summary>
        /// Configures the model
        /// </summary>  
        public HierarchicalDataSourceBuilder<TModel> Model(Action<HierarchicalModelDescriptorBuilder<object>> configurator)
        {
            configurator(new HierarchicalModelDescriptorBuilder<object>(dataSource.Schema.Model, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Specifies if filtering should be handled by the server.
        /// </summary>        
        public HierarchicalDataSourceBuilder<TModel> ServerFiltering()
        {
            dataSource.ServerFiltering = true;
            return this;
        }

        /// <summary>
        /// Specifies if filtering should be handled by the server.
        /// </summary>        
        public HierarchicalDataSourceBuilder<TModel> ServerFiltering(bool enabled)
        {
            dataSource.ServerFiltering = enabled;
            return this;
        }

        protected virtual void SetOperationUrl(CrudOperation operation, string actionName, string controllerName, object routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
