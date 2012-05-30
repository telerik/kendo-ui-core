namespace Kendo.Mvc.Infrastructure.Implementation.Expressions
{
    using System.Collections.Generic;
    using System.Linq;
    using Extensions;

    internal class GroupDescriptorCollectionExpressionBuilder : ExpressionBuilderBase
    {
        private readonly IQueryable queryable;
        private readonly IEnumerable<GroupDescriptor> groupDescriptors;
        private readonly IQueryable notPagedData;

        public GroupDescriptorCollectionExpressionBuilder(IQueryable queryable, IEnumerable<GroupDescriptor> groupDescriptors, IQueryable notPagedData)
            : base(queryable.ElementType)
        {
            this.queryable = queryable;
            this.groupDescriptors = groupDescriptors;
            this.notPagedData = notPagedData;
        }

        public IQueryable CreateQuery()
        {
            GroupDescriptorExpressionBuilder childBuilder = null;
            foreach (GroupDescriptor groupDescriptor in groupDescriptors.Reverse())
            {
                var builder = new GroupDescriptorExpressionBuilder(this.queryable, groupDescriptor, childBuilder, notPagedData);
                builder.Options.LiftMemberAccessToNull = queryable.Provider.IsLinqToObjectsProvider();
                childBuilder = builder;
            }

            if (childBuilder != null)
            {
                return childBuilder.CreateQuery();
            }

            return queryable;
        }
    }
}