namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Transport"/> options.
    /// </summary>
    public abstract class SignalRDataSourceTransportBuilderBase<TTransportBuilder> : IHideObjectMembers
        where TTransportBuilder : SignalRDataSourceTransportBuilderBase<TTransportBuilder>
    {
        protected readonly Transport transport;

        public SignalRDataSourceTransportBuilderBase(Transport transport)
        {
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
        /// The SignalR hub object returned by the createHubProxy method. The hub option is mandatory
        /// </summary>                
        public TTransportBuilder Hub(Func<object, object> handler)
        {
            transport.SignalR.Hub.TemplateDelegate = handler;

            return (TTransportBuilder)this;
        }

        /// <summary>
        /// The SignalR hub object returned by the createHubProxy method. The hub option is mandatory
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public TTransportBuilder Hub(string handler)
        {
            transport.SignalR.Hub.HandlerName = handler;

            return (TTransportBuilder)this;
        }

        /// <summary>
        /// The promise returned by the start method of the SignalR connection. The promise option is mandatory.
        /// </summary>                
        public TTransportBuilder Promise(Func<object, object> handler)
        {
            transport.SignalR.Promise.TemplateDelegate = handler;

            return (TTransportBuilder)this;
        }

        /// <summary>
        /// The promise returned by the start method of the SignalR connection. The promise option is mandatory.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public TTransportBuilder Promise(string handler)
        {
            transport.SignalR.Promise.HandlerName = handler;

            return (TTransportBuilder)this;
        }
    }
}
