using System;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    public class FilterableOperatorsBuilder : IHideObjectMembers
    {
        private readonly FilterableOperators operators;

        public FilterableOperatorsBuilder(FilterableOperators operators)
        {
            this.operators = operators;
        }

        public FilterableOperatorsBuilder Strings(Action<StringOperatorsBuilder> configurator)
        {
            configurator(new StringOperatorsBuilder(operators.Strings));

            return this;
        }
    }
}
