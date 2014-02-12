namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Extensions;
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Transport"/> options.
    /// </summary>
    public abstract class CustomDataSourceTransportBuilderBase<TTransportBuilder> : IHideObjectMembers
        where TTransportBuilder : CustomDataSourceTransportBuilderBase<TTransportBuilder>
    {
        protected readonly Transport transport;
        protected readonly ViewContext viewContext;
        protected readonly IUrlGenerator urlGenerator;

        public CustomDataSourceTransportBuilderBase(Transport transport, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.transport = transport;
        }

        /// <summary>
        /// Sets the parameterMap function.
        /// </summary>
        public TTransportBuilder ParameterMap(Func<object, object> handler)
        {
            transport.ParameterMap.TemplateDelegate = handler;

            return (TTransportBuilder)this;
        }

        /// <summary>
        /// Sets the parameterMap function.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public TTransportBuilder ParameterMap(string handler)
        {
            transport.ParameterMap.HandlerName = handler;

            return (TTransportBuilder)this;
        }

        /// <summary>
        /// Configures the URL for Read operation.
        /// </summary>
        public TTransportBuilder Read(Action<CustomCrudOperationBuilder> configurator)
        {
            configurator(new CustomCrudOperationBuilder(transport.Read, viewContext, urlGenerator));

            return (TTransportBuilder)this;
        }

        /// <summary>
        /// Sets controller and action for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        /// <param name="routeValues">Route values</param>
        public TTransportBuilder Read(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(transport.Read, actionName, controllerName, routeValues);

            return (TTransportBuilder)this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Read operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>
        public TTransportBuilder Read(string actionName, string controllerName)
        {
            SetOperationUrl(transport.Read, actionName, controllerName, null);

            return (TTransportBuilder)this;
        }

        /// <summary>
        /// Sets the Read operation using anonymous object.
        /// </summary>
        public TTransportBuilder Read(object settings)
        {
            var json = new Dictionary<string, object>();
            json.Merge(settings);

            transport.CustomRead = json;

            return (TTransportBuilder)this;
        }

        /// <summary>
        /// Sets JavaScript function which to return additional parameters which to be sent the server.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public TTransportBuilder Read(string handler)
        {
            transport.FunctionRead.HandlerName = handler;

            return (TTransportBuilder)this;
        }

        protected virtual void SetOperationUrl(CrudOperation operation, string actionName, string controllerName, object routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
