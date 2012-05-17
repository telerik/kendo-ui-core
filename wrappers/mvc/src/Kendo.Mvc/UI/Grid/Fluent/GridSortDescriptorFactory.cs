namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Linq;
    using System.Linq.Expressions;

    using Extensions;
    using Infrastructure;
    using Resources;
using System.Collections.Generic;

    public class DataSourceSortDescriptorFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly IList<SortDescriptor> descriptors;

        public DataSourceSortDescriptorFactory(IList<SortDescriptor> descriptors)
        {
            Guard.IsNotNull(descriptors, "descriptors");

            this.descriptors = descriptors;
        }

        public virtual DataSourceSortDescriptorBuilder Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return Add(new SortDescriptor
            {
                Member = expression.MemberWithoutInstance(),
                SortDirection = ListSortDirection.Ascending
            });
        }

        public virtual DataSourceSortDescriptorBuilder Add(string memberName)
        {
            return Add(new SortDescriptor
            {
                Member = memberName,
                SortDirection = ListSortDirection.Ascending
            });
        }

        private DataSourceSortDescriptorBuilder Add(SortDescriptor descriptor)
        {   
            descriptors.Add(descriptor);

            return new DataSourceSortDescriptorBuilder(descriptor);
        }
    }
}