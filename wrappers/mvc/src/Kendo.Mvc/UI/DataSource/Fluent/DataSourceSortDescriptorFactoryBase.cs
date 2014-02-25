namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.ComponentModel;

    public abstract class DataSourceSortDescriptorFactoryBase<TDataSourceSortDescriptorFactory> : IHideObjectMembers
        where TDataSourceSortDescriptorFactory : DataSourceSortDescriptorFactoryBase<TDataSourceSortDescriptorFactory>
    {
        private readonly IList<SortDescriptor> descriptors;

        public DataSourceSortDescriptorFactoryBase(IList<SortDescriptor> descriptors)
        {
            this.descriptors = descriptors;
        }

        public virtual DataSourceSortDescriptorBuilder Add(string memberName)
        {
            return Add(new SortDescriptor
            {
                Member = memberName,
                SortDirection = ListSortDirection.Ascending
            });
        }

        protected DataSourceSortDescriptorBuilder Add(SortDescriptor descriptor)
        {
            descriptors.Add(descriptor);

            return new DataSourceSortDescriptorBuilder(descriptor);
        }
    }
}
