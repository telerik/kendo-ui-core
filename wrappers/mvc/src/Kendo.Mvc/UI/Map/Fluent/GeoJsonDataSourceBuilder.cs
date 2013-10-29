using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public class GeoJsonDataSourceBuilder
    {
        private DataSource dataSource;
        private ViewContext viewContext;
        private IUrlGenerator urlGenerator;

        public GeoJsonDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.dataSource = dataSource;
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        /// <summary>
        /// Configures the URL for Read operation.
        /// </summary> 
        public GeoJsonDataSourceBuilder Read(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Read, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public GeoJsonDataSourceBuilder Read(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public GeoJsonDataSourceBuilder Read(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, null);

            return this;
        }

        protected virtual void SetOperationUrl(CrudOperation operation, string actionName, string controllerName, object routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
