namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="HierarchicalDataSource"/>.
    /// </summary>
    public class HierarchicalDataSourceBuilder : IHideObjectMembers
    {
        private readonly HierarchicalDataSource dataSource;
        private readonly IUrlGenerator urlGenerator;
        private readonly ViewContext viewContext;

        public HierarchicalDataSourceBuilder(HierarchicalDataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.dataSource = dataSource;
            this.urlGenerator = urlGenerator;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Configures the URL for Read operation.
        /// </summary> 
        public HierarchicalDataSourceBuilder Read(Action<CrudOperationBuilder> configurator)
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
        public HierarchicalDataSourceBuilder Read(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets controller and action for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public HierarchicalDataSourceBuilder Read(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>  
        public HierarchicalDataSourceBuilder Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return this;
        }

        /// <summary>
        /// Configures the model
        /// </summary>  
        public HierarchicalDataSourceBuilder Model(Action<HierarchicalModelDescriptorBuilder> configurator)
        {
            configurator(new HierarchicalModelDescriptorBuilder(dataSource.Model));

            return this;
        }

        /// <summary>
        /// Specifies if filtering should be handled by the server.
        /// </summary>        
        public HierarchicalDataSourceBuilder ServerFiltering()
        {
            dataSource.ServerFiltering = true;
            return this;
        }

        /// <summary>
        /// Specifies if filtering should be handled by the server.
        /// </summary>        
        public HierarchicalDataSourceBuilder ServerFiltering(bool enabled)
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
