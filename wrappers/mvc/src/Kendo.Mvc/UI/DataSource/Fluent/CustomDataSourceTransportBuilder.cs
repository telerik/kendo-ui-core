namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Extensions;
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Transport"/> options.
    /// </summary>
    public class CustomDataSourceTransportBuilder : CustomDataSourceTransportBuilderBase<CustomDataSourceTransportBuilder>, IHideObjectMembers
    {
        public CustomDataSourceTransportBuilder(Transport transport, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(transport, viewContext, urlGenerator)
        { 
        }

        /// <summary>
        /// Configures the URL for Update operation.
        /// </summary>
        public CustomDataSourceTransportBuilder Update(Action<CustomCrudOperationBuilder> configurator)
        {
            configurator(new CustomCrudOperationBuilder(transport.Update, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Update operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        public CustomDataSourceTransportBuilder Update(string actionName, string controllerName)
        {
            SetOperationUrl(transport.Update, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Update operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        /// <param name="routeValues">Route values</param>
        public CustomDataSourceTransportBuilder Update(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(transport.Update, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the Update operation using anonymous object.
        /// </summary>
        public CustomDataSourceTransportBuilder Update(object settings)
        {
            var json = new Dictionary<string, object>();
            json.Merge(settings);

            transport.CustomUpdate = json;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return additional parameters which to be sent the server.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public CustomDataSourceTransportBuilder Update(string handler)
        {
            transport.FunctionUpdate.HandlerName = handler;

            return this;
        }

        /// <summary>
        /// Configures the URL for Create operation.
        /// </summary>
        public CustomDataSourceTransportBuilder Create(Action<CustomCrudOperationBuilder> configurator)
        {
            configurator(new CustomCrudOperationBuilder(transport.Create, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Create operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        public CustomDataSourceTransportBuilder Create(string actionName, string controllerName)
        {
            SetOperationUrl(transport.Create, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Create operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        /// <param name="routeValues">Route values</param>
        public CustomDataSourceTransportBuilder Create(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(transport.Create, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the Create operation using anonymous object.
        /// </summary>
        public CustomDataSourceTransportBuilder Create(object settings)
        {
            var json = new Dictionary<string, object>();
            json.Merge(settings);

            transport.CustomCreate = json;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return additional parameters which to be sent the server.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public CustomDataSourceTransportBuilder Create(string handler)
        {
            transport.FunctionCreate.HandlerName = handler;

            return this;
        }

        /// <summary>
        /// Configures the URL for Destroy operation.
        /// </summary>
        public CustomDataSourceTransportBuilder Destroy(Action<CustomCrudOperationBuilder> configurator)
        {
            configurator(new CustomCrudOperationBuilder(transport.Destroy, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Destroy operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        public CustomDataSourceTransportBuilder Destroy(string actionName, string controllerName)
        {
            SetOperationUrl(transport.Destroy, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Destroy operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        /// <param name="routeValues">Route values</param>
        public CustomDataSourceTransportBuilder Destroy(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(transport.Destroy, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the Destroy operation using anonymous object.
        /// </summary>
        public CustomDataSourceTransportBuilder Destroy(object settings)
        {
            var json = new Dictionary<string, object>();
            json.Merge(settings);

            transport.CustomDestroy = json;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return additional parameters which to be sent the server.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public CustomDataSourceTransportBuilder Destroy(string handler)
        {
            transport.FunctionDestroy.HandlerName = handler;

            return this;
        }
    }
}
