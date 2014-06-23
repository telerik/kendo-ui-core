namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotTransport"/> options.
    /// </summary>
    public class PivotDataSourceTransportBuilder : IHideObjectMembers
    {
        protected readonly PivotTransport transport;
        protected readonly ViewContext viewContext;
        protected readonly IUrlGenerator urlGenerator;

        public PivotDataSourceTransportBuilder(PivotTransport transport, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.transport = transport;
        }

        /// <summary>
        /// Configures the Read operation.
        /// </summary>
        public PivotDataSourceTransportBuilder Read(Action<CustomCrudOperationBuilder> configurator)
        {
            configurator(new CustomCrudOperationBuilder(transport.Read, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Configures transport connection.
        /// </summary>
        public PivotDataSourceTransportBuilder Connection(Action<PivotDataSourceTransportConnectionBuilder> configurator)
        {
            configurator(new PivotDataSourceTransportConnectionBuilder(transport.Connection));

            return this;
        }

        /// <summary>
        /// Configures the discover operation.
        /// </summary>
        public PivotDataSourceTransportBuilder Discover(Action<CustomCrudOperationBuilder> configurator)
        {
            configurator(new CustomCrudOperationBuilder(transport.Discover, viewContext, urlGenerator));

            return this;
        }

    }
}
