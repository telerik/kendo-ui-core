namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq.Expressions;
    using Extensions;
    using Kendo.Mvc.Infrastructure;

    public class DataSourceAggregateDescriptorFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly IList<AggregateDescriptor> descriptors;

        public DataSourceAggregateDescriptorFactory(IList<AggregateDescriptor> descriptors)
        {
            this.descriptors = descriptors;
        }

        public DataSourceAggregatesFactory Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {            
            return AddDescriptor(expression.MemberWithoutInstance(), typeof(TValue));
        }

        private DataSourceAggregatesFactory AddDescriptor(string memberName, Type memberType)
        {

            var descriptor = new AggregateDescriptor();
            descriptor.Member = memberName;                        

            descriptors.Add(descriptor);

            return new DataSourceAggregatesFactory(descriptor.Aggregates, memberName, memberType);
        }
    }
}
