namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Extensions;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Transport"/> options.
    /// </summary>
    public class ReadOnlySignalRDataSourceTransportBuilder : SignalRDataSourceTransportBuilderBase<ReadOnlySignalRDataSourceTransportBuilder>, IHideObjectMembers
    {
        public ReadOnlySignalRDataSourceTransportBuilder(Transport transport)
            : base(transport)
        { 
        }

        /// <summary>
        /// Configures the client-side CRUD methods of the SignalR hub.
        /// </summary>
        public ReadOnlySignalRDataSourceTransportBuilder Client(Action<ReadOnlySignalRCrudOperationsBuilder> configurator)
        {
            configurator(new ReadOnlySignalRCrudOperationsBuilder(transport.SignalR.Client));

            return this;
        }

        /// <summary>
        /// Configures the client-side CRUD methods of the SignalR hub.
        /// </summary>
        public ReadOnlySignalRDataSourceTransportBuilder Client(object settings)
        {
            transport.SignalR.Client.Merge(settings);

            return this;
        }

        /// <summary>
        /// Configures the server-side CRUD methods of the SignalR hub.
        /// </summary>
        public ReadOnlySignalRDataSourceTransportBuilder Server(Action<ReadOnlySignalRCrudOperationsBuilder> configurator)
        {
           configurator(new ReadOnlySignalRCrudOperationsBuilder(transport.SignalR.Server));

            return this;
        }

        /// <summary>
        /// Configures the server-side CRUD methods of the SignalR hub.
        /// </summary>
        public ReadOnlySignalRDataSourceTransportBuilder Server(object settings)
        {
            transport.SignalR.Server.Merge(settings);

            return this;
        }
    }
}
