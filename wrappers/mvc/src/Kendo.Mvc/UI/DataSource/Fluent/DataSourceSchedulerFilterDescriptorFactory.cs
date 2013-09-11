namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using Extensions;

    public class DataSourceSchedulerFilterDescriptorFactory<TModel> : DataSourceFilterDescriptorFactory<TModel>, IHideObjectMembers 
        where TModel : class
    {
        public DataSourceSchedulerFilterDescriptorFactory(IList<IFilterDescriptor> filters)
            : base(filters)
        { 
            
        }

        protected override CompositeFilterDescriptor CreateFilter<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            var composite = new CompositeFilterDescriptor
            {
                LogicalOperator = FilterCompositionLogicalOperator.And
            };

            var descriptor = new FilterDescriptor { Member = expression.MemberWithoutInstance() };

            var schedulerEventInterface = typeof(ISchedulerEvent);

            var currentMember = descriptor.Member;

            if (schedulerEventInterface.GetProperty(currentMember) != null)
            {
                var updatedMember = Char.ToLowerInvariant(currentMember[0]) + currentMember.Substring(1);
                descriptor.Member = updatedMember;
            }

            composite.FilterDescriptors.Add(descriptor);

            Filters.Add(composite);

            return composite;
        }
    }
}
