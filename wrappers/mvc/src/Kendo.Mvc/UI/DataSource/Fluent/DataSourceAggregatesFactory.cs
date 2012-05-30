namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System;

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

        public DataSourceAggregatesFactory Min()
        {
            aggregates.Add(new MinFunction { SourceField = member });
            return this;
        }

        public DataSourceAggregatesFactory Max()
        {
            aggregates.Add(new MaxFunction { SourceField = member });
            return this;
        }

        public DataSourceAggregatesFactory Count()
        {
            aggregates.Add(new CountFunction { SourceField = member });
            return this;
        }

        public DataSourceAggregatesFactory Average()
        {
            aggregates.Add(new AverageFunction { SourceField = member, MemberType = memberType });
            return this;
        }

        public DataSourceAggregatesFactory Sum()
        {
            aggregates.Add(new SumFunction { SourceField = member, MemberType = memberType });
            return this;
        }
    }
}