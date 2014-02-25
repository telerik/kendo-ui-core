namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;

    public class ReadOnlySignalRCrudOperationsBuilder : SignalRCrudOperationsBuilderBase<ReadOnlySignalRCrudOperationsBuilder>, IHideObjectMembers
    {
        public ReadOnlySignalRCrudOperationsBuilder(IDictionary<string, object> crudOperation)
            : base(crudOperation)
        {
        }
    }
}
