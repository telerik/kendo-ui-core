namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Extensions;
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Transport"/> options.
    /// </summary>
    public class PivotAjaxDataSourceTransportBuilder
    {
        protected readonly PivotTransport transport;
        protected readonly ViewContext viewContext;
        protected readonly IUrlGenerator urlGenerator;

        public PivotAjaxDataSourceTransportBuilder(PivotTransport transport, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.transport = transport;
        }

        /// <summary>
        /// Configures the URL for Read operation.
        /// </summary>
        public PivotAjaxDataSourceTransportBuilder Read(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(transport.Read, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        /// <param name="routeValues">Route values</param>
        public PivotAjaxDataSourceTransportBuilder Read(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(transport.Read, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        public PivotAjaxDataSourceTransportBuilder Read(string actionName, string controllerName)
        {
            SetOperationUrl(transport.Read, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Configures the discover operation.
        /// </summary>
        public PivotAjaxDataSourceTransportBuilder Discover(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(transport.Discover, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Discover operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        /// <param name="routeValues">Route values</param>
        public PivotAjaxDataSourceTransportBuilder Discover(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(transport.Discover, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Discover operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        public PivotAjaxDataSourceTransportBuilder Discover(string actionName, string controllerName)
        {
            SetOperationUrl(transport.Discover, actionName, controllerName, null);

            return this;
        }

        protected virtual void SetOperationUrl(CrudOperation operation, string actionName, string controllerName, object routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
