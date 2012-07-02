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

        public FilterableOperatorsBuilder ForString(Action<StringOperatorsBuilder> configurator)
        {
            configurator(new StringOperatorsBuilder(operators.Strings));

            return this;
        }

        public FilterableOperatorsBuilder ForNumber(Action<NumberOperatorsBuilder> configurator)
        {
            configurator(new NumberOperatorsBuilder(operators.Numbers));

            return this;
        }
        public FilterableOperatorsBuilder ForDate(Action<DateOperatorsBuilder> configurator)
        {
            configurator(new DateOperatorsBuilder(operators.Dates));

            return this;
        }

        public FilterableOperatorsBuilder ForEnums(Action<EnumOperatorsBuilder> configurator)
        {
            configurator(new EnumOperatorsBuilder(operators.Enums));

            return this;
        }   
    }
}
