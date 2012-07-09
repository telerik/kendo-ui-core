namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring aggregates for a given field.
    /// </summary>
    public class DataSourceAggregatesFactory : IHideObjectMembers
    {
        private readonly ICollection<AggregateFunction> aggregates;
        private readonly string member;
        private readonly Type memberType;

        public DataSourceAggregatesFactory(ICollection<AggregateFunction> aggregates, string member, Type memberType)
        {
            this.aggregates = aggregates;
            this.member = member;
            this.memberType = memberType;
        }

        /// <summary>
        /// Applies the Min aggregate function.
        /// </summary>        
        public DataSourceAggregatesFactory Min()
        {
            aggregates.Add(new MinFunction { SourceField = member });
            return this;
        }

        /// <summary>
        /// Applies the Max aggregate function.
        /// </summary>
        public DataSourceAggregatesFactory Max()
        {
            aggregates.Add(new MaxFunction { SourceField = member });
            return this;
        }

        /// <summary>
        /// Applies the Count aggregate function.
        /// </summary>
        public DataSourceAggregatesFactory Count()
        {
            aggregates.Add(new CountFunction { SourceField = member });
            return this;
        }

        /// <summary>
        /// Applies the Average aggregate function.
        /// </summary>
        public DataSourceAggregatesFactory Average()
        {
            aggregates.Add(new AverageFunction { SourceField = member, MemberType = memberType });
            return this;
        }

        /// <summary>
        /// Applies the Sum aggregate function.
        /// </summary>
        public DataSourceAggregatesFactory Sum()
        {
            aggregates.Add(new SumFunction { SourceField = member, MemberType = memberType });
            return this;
        }
    }
}