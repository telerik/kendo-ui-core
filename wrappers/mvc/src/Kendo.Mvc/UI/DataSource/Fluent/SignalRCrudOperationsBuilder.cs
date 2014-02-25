namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;

    public class SignalRCrudOperationsBuilder : SignalRCrudOperationsBuilderBase<SignalRCrudOperationsBuilder>, IHideObjectMembers
    {
        public SignalRCrudOperationsBuilder(IDictionary<string, object> crudOperation)
            : base(crudOperation)
        {
        }

        /// <summary>
        /// The name of the method of the SignalR hub responsible for updating data items.
        /// </summary>
        /// <param name="method">Method name</param>
        public SignalRCrudOperationsBuilder Update(string method)
        {
            crudOperation.Add("update", method);

            return this;
        }

        /// <summary>
        /// The name of the method of the SignalR hub responsible for creating data items.
        /// </summary>
        /// <param name="method">Method name</param>
        public SignalRCrudOperationsBuilder Create(string method)
        {
            crudOperation.Add("create", method);

            return this;
        }

        /// <summary>
        /// The name of the method of the SignalR hub responsible for destroying data items.
        /// </summary>
        /// <param name="method">Method name</param>
        public SignalRCrudOperationsBuilder Destroy(string method)
        {
            crudOperation.Add("destroy", method);

            return this;
        }
    }
}
