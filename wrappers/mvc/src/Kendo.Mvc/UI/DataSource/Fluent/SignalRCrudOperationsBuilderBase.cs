namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;

    public abstract class SignalRCrudOperationsBuilderBase<TSignalRCrudOperationBuilder> : IHideObjectMembers
        where TSignalRCrudOperationBuilder : SignalRCrudOperationsBuilderBase<TSignalRCrudOperationBuilder>
    {
        protected readonly IDictionary<string, object> crudOperation;

        public SignalRCrudOperationsBuilderBase(IDictionary<string, object> crudOperation)
        {
            this.crudOperation = crudOperation;
        }

        /// <summary>
        /// The name of the method of the SignalR hub responsible for reading data items.
        /// </summary>
        /// <param name="method">Method name</param>
        public TSignalRCrudOperationBuilder Read(string method)
        {
            crudOperation.Add("read", method);

            return (TSignalRCrudOperationBuilder)this;
        }
    }
}
