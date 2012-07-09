using System;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the Filter menu <see cref="FilterableOperators"/>.
    /// </summary>
    public class FilterableOperatorsBuilder : IHideObjectMembers
    {
        private readonly FilterableOperators operators;

        public FilterableOperatorsBuilder(FilterableOperators operators)
        {
            this.operators = operators;
        }

        /// <summary>
        /// Configures messages for string operators.
        /// </summary>        
        public FilterableOperatorsBuilder ForString(Action<StringOperatorsBuilder> configurator)
        {
            configurator(new StringOperatorsBuilder(operators.Strings));

            return this;
        }

        /// <summary>
        /// Configures messages for number operators.
        /// </summary>
        public FilterableOperatorsBuilder ForNumber(Action<NumberOperatorsBuilder> configurator)
        {
            configurator(new NumberOperatorsBuilder(operators.Numbers));

            return this;
        }

        /// <summary>
        /// Configures messages for date operators.
        /// </summary>        
        public FilterableOperatorsBuilder ForDate(Action<DateOperatorsBuilder> configurator)
        {
            configurator(new DateOperatorsBuilder(operators.Dates));

            return this;
        }

        /// <summary>
        /// Configures messages for enums operators.
        /// </summary>        
        public FilterableOperatorsBuilder ForEnums(Action<EnumOperatorsBuilder> configurator)
        {
            configurator(new EnumOperatorsBuilder(operators.Enums));

            return this;
        }   
    }
}
