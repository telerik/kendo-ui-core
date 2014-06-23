namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGridTransport"/> options.
    /// </summary>
    public class PivotGridDataSourceTransportBuilder : IHideObjectMembers
    {
        protected readonly PivotGridTransport transport;
        protected readonly ViewContext viewContext;
        protected readonly IUrlGenerator urlGenerator;

        public PivotGridDataSourceTransportBuilder(PivotGridTransport transport, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.transport = transport;
        }

        /// <summary>
        /// Configures the Read operation.
        /// </summary>
        public PivotGridDataSourceTransportBuilder Read(Action<CustomCrudOperationBuilder> configurator)
        {
            configurator(new CustomCrudOperationBuilder(transport.Read, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Configures transport connection.
        /// </summary>
        public PivotGridDataSourceTransportBuilder Connection(Action<PivotGridDataSourceTransportConnectionBuilder> configurator)
        {
            configurator(new PivotGridDataSourceTransportConnectionBuilder(transport.Connection));

            return this;
        }

        /// <summary>
        /// Configures the discover operation.
        /// </summary>
        public PivotGridDataSourceTransportBuilder Discover(Action<CustomCrudOperationBuilder> configurator)
        {
            configurator(new CustomCrudOperationBuilder(transport.Discover, viewContext, urlGenerator));

            return this;
        }

    }
}
