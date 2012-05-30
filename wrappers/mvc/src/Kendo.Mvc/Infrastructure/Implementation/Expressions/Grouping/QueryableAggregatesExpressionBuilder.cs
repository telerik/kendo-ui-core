namespace Kendo.Mvc.Infrastructure.Implementation.Expressions
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    
    internal class QueryableAggregatesExpressionBuilder : GroupDescriptorExpressionBuilder
    {
        public QueryableAggregatesExpressionBuilder(IQueryable queryable, IEnumerable<AggregateFunction> aggregateFunctions)
            : base(queryable, CreateDescriptor(aggregateFunctions))
        {
        }

        private static GroupDescriptor CreateDescriptor(IEnumerable<AggregateFunction> aggregateFunctions)
        {
            var groupDescriptor = new GroupDescriptor();
            groupDescriptor.AggregateFunctions.AddRange(aggregateFunctions);

            return groupDescriptor;
        }

        protected override LambdaExpression CreateGroupByExpression()
        {
            return Expression.Lambda(Expression.Constant(1), this.ParameterExpression);
        }

        protected override IEnumerable<MemberBinding> CreateMemberBindings()
        {
            yield return this.CreateKeyMemberBinding();
            yield return this.CreateCountMemberBinding();
            yield return this.CreateHasSubgroupsMemberBinding();            
            if (GroupDescriptor.AggregateFunctions.Count > 0)
            {
                yield return this.CreateAggregateFunctionsProjectionMemberBinding();
            }
            yield return this.CreateFieldNameMemberBinding();
        }
    }
}