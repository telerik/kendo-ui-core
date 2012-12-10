namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq.Expressions;
    using Extensions;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="AggregateDescriptor"/>.
    /// </summary>    
    public class DataSourceAggregateDescriptorFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly IList<AggregateDescriptor> descriptors;

        public DataSourceAggregateDescriptorFactory(IList<AggregateDescriptor> descriptors)
        {
            this.descriptors = descriptors;
        }

        /// <summary>
        /// Specifies member on which aggregates to be calculated.
        /// </summary>
        public DataSourceAggregatesFactory Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {            
            return AddDescriptor(expression.MemberWithoutInstance(), typeof(TValue));
        }

        /// <summary>
        /// Specifies member on which aggregates to be calculated.
        /// </summary>
        public DataSourceAggregatesFactory Add(string memberName, Type memberType)
        {
            return AddDescriptor(memberName, memberType);
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
