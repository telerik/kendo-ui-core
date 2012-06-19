namespace Kendo.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Reflection;

    using Extensions;

    internal class GroupDescriptorExpressionBuilder : GroupDescriptorExpressionBuilderBase
    {
        private readonly GroupDescriptor groupDescriptor;
        private readonly GroupDescriptorExpressionBuilder childBuilder;
        private readonly IQueryable notPagedData;

        private ParameterExpression groupingParameterExpression;
        private Expression aggregateParameterExpression;
       
        public GroupDescriptorExpressionBuilder ChildBuilder
        {
            get
            {
                return this.childBuilder;
            }
        }

        public GroupDescriptor GroupDescriptor
        {
            get
            {
                return this.groupDescriptor;
            }
        }

        public bool HasSubgroups
        {
            get
            {
                return this.childBuilder != null;
            }
        }

        protected override ListSortDirection? SortDirection
        {
            get
            {
                return this.groupDescriptor.SortDirection;
            }
        }

        private ParameterExpression GroupingParameterExpression
        {
            get
            {
                if (this.groupingParameterExpression == null)
                {
                    LambdaExpression groupByExpression = this.CreateGroupByExpression();
                    Type groupingType = typeof(IGrouping<,>).MakeGenericType(groupByExpression.Body.Type, this.ItemType);

                    this.groupingParameterExpression = Expression.Parameter(groupingType, "group" + GetHashCode());
                }

                return this.groupingParameterExpression;
            }
        }

        private Expression AggregateParameterExpression
        {
            get
            {
                if (aggregateParameterExpression == null)
                {
                    var groupItemsFilterExpression = CreateChildItemsFilterExpression();
                    var items = notPagedData;

                    if (ParentBuilder != null)
                    {
                        ParentBuilder.CreateChildItemsFilterExpressionFromRecursive()
                               .Each(expression =>
                               {
                                   items = items.Where(expression);
                               });
                    }

                    items = items.Where(groupItemsFilterExpression);

                    aggregateParameterExpression = items.Expression;
                }

                return aggregateParameterExpression;
            }
        }

        public GroupDescriptorExpressionBuilder ParentBuilder
        {
            get;
            set;
        }

        public GroupDescriptorExpressionBuilder(IQueryable queryable, GroupDescriptor groupDescriptor)
            : this(queryable, groupDescriptor, null, queryable)
        {
            this.groupDescriptor = groupDescriptor;
        }

        public GroupDescriptorExpressionBuilder(IQueryable queryable, GroupDescriptor groupDescriptor, GroupDescriptorExpressionBuilder childBuilder, IQueryable notPagedData)
            : base(queryable)
        {
            this.groupDescriptor = groupDescriptor;
            this.childBuilder = childBuilder;
            this.notPagedData = notPagedData;
        }

        protected override LambdaExpression CreateGroupByExpression()
        {
            var memberAccessBuilder = ExpressionBuilderFactory.MemberAccess(this.Queryable, this.groupDescriptor.MemberType, this.groupDescriptor.Member);
            memberAccessBuilder.ParameterExpression = this.ParameterExpression;
            return memberAccessBuilder.CreateLambdaExpression();
        }

        protected override LambdaExpression CreateOrderByExpression()
        {
            var keyPropertyExpression = Expression.Property(this.GroupingParameterExpression, "Key");
            LambdaExpression memberExpression = Expression.Lambda(keyPropertyExpression, GroupingParameterExpression);

            return memberExpression;
        }

        protected override LambdaExpression CreateSelectExpression()
        {
            if (HasSubgroups)
            {
                childBuilder.ParentBuilder = this;
            }
            return Expression.Lambda(this.CreateSelectBodyExpression(), this.GroupingParameterExpression);
        }

        private Expression CreateSelectBodyExpression()
        {
            var newGroupExpression = Expression.New(typeof(AggregateFunctionsGroup));
            var memberBindings = this.CreateMemberBindings();

            return Expression.MemberInit(newGroupExpression, memberBindings);
        }

        protected virtual IEnumerable<MemberBinding> CreateMemberBindings()
        {
            yield return this.CreateKeyMemberBinding();
            yield return this.CreateCountMemberBinding();
            yield return this.CreateHasSubgroupsMemberBinding();
            yield return this.CreateFieldNameMemberBinding();

            if (groupDescriptor.AggregateFunctions.Count > 0)
            {
                yield return this.CreateAggregateFunctionsProjectionMemberBinding();
            }
            yield return this.CreateItemsMemberBinding();
        }

        protected MemberBinding CreateItemsMemberBinding()
        {
            PropertyInfo itemsPropertyInfo = typeof(AggregateFunctionsGroup).GetProperty("Items");
            Expression itemsExpression = this.CreateItemsExpression();

            return Expression.Bind(itemsPropertyInfo, itemsExpression);
        }

        private Expression CreateItemsExpression()
        {
            if (HasSubgroups)
            {
                return this.CreateItemsExpressionFromChildBuilder();
            }

            return this.GroupingParameterExpression;
        }

        private Expression CreateItemsExpressionFromChildBuilder()
        {
            var groupItemsFilterExpression = CreateChildItemsFilterExpression();

            IQueryable groupItems = this.Queryable.Where(groupItemsFilterExpression);
            childBuilder.Queryable = groupItems;

            return childBuilder.CreateQuery().Expression;
        }

        public IEnumerable<LambdaExpression> CreateChildItemsFilterExpressionFromRecursive()
        {
            var result = new List<LambdaExpression> {
               CreateChildItemsFilterExpression()
            };

            if (ParentBuilder != null)
            {
                result.AddRange(ParentBuilder.CreateChildItemsFilterExpressionFromRecursive());
            }

            return result;
        }

        public LambdaExpression CreateChildItemsFilterExpression()
        {
            LambdaExpression groupByExpression = this.CreateGroupByExpression();
            Expression keyPropertyExpression = Expression.Property(GroupingParameterExpression, "Key");
            Expression body = Expression.Equal(groupByExpression.Body, keyPropertyExpression);

            return Expression.Lambda(body, ParameterExpression);
        }

        protected MemberBinding CreateKeyMemberBinding()
        {
            PropertyInfo keyPropertyInfo = typeof(AggregateFunctionsGroup).GetProperty("Key");
            Expression keyPropertyExpression = Expression.Property(GroupingParameterExpression, "Key");

            // Our Key property is of type object so we need to box if the value is ValueType.
            // EF did not support convert so did not call it.
            // Note: We can fix all this if our group is generic type similar to IGrouping<TKey, TElement>
            if (keyPropertyExpression.Type.IsValueType &&
                !this.Queryable.Provider.IsEntityFrameworkProvider())
            {
                keyPropertyExpression = Expression.Convert(keyPropertyExpression, typeof(object));
            }

            return Expression.Bind(keyPropertyInfo, keyPropertyExpression);
        }

        protected MemberBinding CreateCountMemberBinding()
        {
            PropertyInfo itemCountPropertyInfo = typeof(AggregateFunctionsGroup).GetProperty("ItemCount");

            Expression countMethodCallExpression =
                Expression.Call(typeof(Enumerable), "Count", new[] { this.ItemType }, GroupingParameterExpression);

            return Expression.Bind(itemCountPropertyInfo, countMethodCallExpression);
        }

        protected MemberBinding CreateFieldNameMemberBinding()
        {
            PropertyInfo memberPropertyInfo = typeof(AggregateFunctionsGroup).GetProperty("Member");
            Expression memberExpression = Expression.Constant(GroupDescriptor.Member ?? "");

            return Expression.Bind(memberPropertyInfo, memberExpression);
        }

        protected MemberBinding CreateHasSubgroupsMemberBinding()
        {
            PropertyInfo hasSubgroupsPropertyInfo = typeof(AggregateFunctionsGroup).GetProperty("HasSubgroups");
            Expression hasSubgroupsExpression = Expression.Constant(this.HasSubgroups);

            return Expression.Bind(hasSubgroupsPropertyInfo, hasSubgroupsExpression);
        }

        protected MemberBinding CreateAggregateFunctionsProjectionMemberBinding()
        {
            PropertyInfo projectionPropertyInfo = typeof(AggregateFunctionsGroup).GetProperty("AggregateFunctionsProjection");
            Expression projectionInitExpression = this.CreateProjectionInitExpression();

            return Expression.Bind(projectionPropertyInfo, projectionInitExpression);
        }

        private Expression CreateProjectionInitExpression()
        {
            var projectionPropertyValueExpressions = this.ProjectionPropertyValueExpressions().ToList();
            var newProjectionExpression = this.CreateProjectionNewExpression(projectionPropertyValueExpressions);
            var projectionMemberBindings = this.CreateProjectionMemberBindings(newProjectionExpression.Type, projectionPropertyValueExpressions);

            return Expression.MemberInit(newProjectionExpression, projectionMemberBindings);
        }

        private IEnumerable<Expression> ProjectionPropertyValueExpressions()
        {
            return this.groupDescriptor.AggregateFunctions.Select(f => f.CreateAggregateExpression(AggregateParameterExpression, Options.LiftMemberAccessToNull));
        }

        private NewExpression CreateProjectionNewExpression(IEnumerable<Expression> propertyValuesExpressions)
        {
            var properties = this.groupDescriptor.AggregateFunctions.Consolidate(
                propertyValuesExpressions, (f, e) => new DynamicProperty(f.FunctionName, e.Type));
            var projectionType = ClassFactory.Instance.GetDynamicClass(properties);

            return Expression.New(projectionType);
        }

        private IEnumerable<MemberBinding> CreateProjectionMemberBindings(Type projectionType, IEnumerable<Expression> propertyValuesExpressions)
        {
            return
                this.groupDescriptor.AggregateFunctions.Consolidate(
                    propertyValuesExpressions, (f, e) => Expression.Bind(projectionType.GetProperty(f.FunctionName), e)).Cast<MemberBinding>();
        }
    }
}