namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotTransport"/> component.
    /// </summary>
    public class PivotCustomDataSourceTransportBuilder
    {
        protected readonly PivotTransport transport;
        protected readonly ViewContext viewContext;
        protected readonly IUrlGenerator urlGenerator;

        public PivotCustomDataSourceTransportBuilder(PivotTransport transport, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.transport = transport;
        }

        /// <summary>
        /// Configures the Read operation.
        /// </summary>
        public PivotCustomDataSourceTransportBuilder Read(Action<CustomCrudOperationBuilder> configurator)
        {
            configurator(new CustomCrudOperationBuilder(transport.Read, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets the Read operation using anonymous object.
        /// </summary>
        public PivotCustomDataSourceTransportBuilder Read(object settings)
        {
            var json = new Dictionary<string, object>();
            json.Merge(settings);

            transport.CustomRead = json;

            return this;
        }

        /// <summary>
        /// Sets the Read operation to JavaScript function or object.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public PivotCustomDataSourceTransportBuilder Read(string handler)
        {
            transport.FunctionRead.HandlerName = handler;

            return this;
        }

        /// <summary>
        /// Configures transport connection.
        /// </summary>
        public PivotCustomDataSourceTransportBuilder Connection(Action<PivotDataSourceTransportConnectionBuilder> configurator)
        {
            configurator(new PivotDataSourceTransportConnectionBuilder(transport.Connection));

            return this;
        }

        /// <summary>
        /// Configures the discover operation.
        /// </summary>
        public PivotCustomDataSourceTransportBuilder Discover(Action<CustomCrudOperationBuilder> configurator)
        {
            configurator(new CustomCrudOperationBuilder(transport.Discover, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets the Discover operation using anonymous object.
        /// </summary>
        public PivotCustomDataSourceTransportBuilder Discover(object settings)
        {
            var json = new Dictionary<string, object>();
            json.Merge(settings);

            transport.CustomDiscover = json;

            return this;
        }

        /// <summary>
        /// Sets the Discover operation to JavaScript function or object.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public PivotCustomDataSourceTransportBuilder Discover(string handler)
        {
            transport.FunctionDiscover.HandlerName = handler;

            return this;
        }

        /// <summary>
        /// Sets the parameterMap function.
        /// </summary>
        public PivotCustomDataSourceTransportBuilder ParameterMap(Func<object, object> handler)
        {
            transport.ParameterMap.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets the parameterMap function.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public PivotCustomDataSourceTransportBuilder ParameterMap(string handler)
        {
            transport.ParameterMap.HandlerName = handler;

            return this;
        }
    }
}
