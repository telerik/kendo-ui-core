using System;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    public class CrudOperationBuilder: IHideObjectMembers
    {
        private readonly CrudOperation operation;

        public CrudOperationBuilder(CrudOperation operation)
        {
            this.operation = operation;
        }
    }
}
