namespace KendoUI.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System;

    public class GridAggregatesFactory : IHideObjectMembers
    {
        private readonly ICollection<AggregateFunction> aggregates;
        private readonly string member;
        private readonly Type memberType;

        public GridAggregatesFactory(ICollection<AggregateFunction> aggregates, string member, Type memberType)
        {
            this.aggregates = aggregates;
            this.member = member;
            this.memberType = memberType;
        }

        public GridAggregatesFactory Min()
        {
            aggregates.Add(new MinFunction { SourceField = member });
            return this;
        }

        public GridAggregatesFactory Max()
        {
            aggregates.Add(new MaxFunction { SourceField = member });
            return this;
        }

        public GridAggregatesFactory Count()
        {
            aggregates.Add(new CountFunction { SourceField = member });
            return this;
        }

        public GridAggregatesFactory Average()
        {
            aggregates.Add(new AverageFunction { SourceField = member, MemberType = memberType });
            return this;
        }

        public GridAggregatesFactory Sum()
        {
            aggregates.Add(new SumFunction { SourceField = member, MemberType = memberType });
            return this;
        }
    }
}