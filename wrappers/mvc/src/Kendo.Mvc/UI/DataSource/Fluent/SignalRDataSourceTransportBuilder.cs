namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Extensions;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Transport"/> options.
    /// </summary>
    public class SignalRDataSourceTransportBuilder : SignalRDataSourceTransportBuilderBase<SignalRDataSourceTransportBuilder>, IHideObjectMembers
    {
        public SignalRDataSourceTransportBuilder(Transport transport)
            : base(transport)
        { 
        }

        /// <summary>
        /// Configures the client-side CRUD methods of the SignalR hub.
        /// </summary>
        public SignalRDataSourceTransportBuilder Client(Action<SignalRCrudOperationsBuilder> configurator)
        {
            configurator(new SignalRCrudOperationsBuilder(transport.SignalR.Client));

            return this;
        }

        /// <summary>
        /// Configures the client-side CRUD methods of the SignalR hub.
        /// </summary>
        public SignalRDataSourceTransportBuilder Client(object settings)
        {
            transport.SignalR.Client.Merge(settings);

            return this;
        }

        /// <summary>
        /// Configures the server-side CRUD methods of the SignalR hub.
        /// </summary>
        public SignalRDataSourceTransportBuilder Server(Action<SignalRCrudOperationsBuilder> configurator)
        {
            configurator(new SignalRCrudOperationsBuilder(transport.SignalR.Server));

            return this;
        }

        /// <summary>
        /// Configures the server-side CRUD methods of the SignalR hub.
        /// </summary>
        public SignalRDataSourceTransportBuilder Server(object settings)
        {
            transport.SignalR.Server.Merge(settings);

            return this;
        }
    }
}
