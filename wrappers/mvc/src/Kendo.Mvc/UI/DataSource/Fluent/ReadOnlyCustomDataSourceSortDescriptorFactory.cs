namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;

    public class ReadOnlyCustomDataSourceSortDescriptorFactory : DataSourceSortDescriptorFactoryBase<ReadOnlyCustomDataSourceSortDescriptorFactory>, IHideObjectMembers
    {
        public ReadOnlyCustomDataSourceSortDescriptorFactory(IList<SortDescriptor> descriptors)
            : base(descriptors)
        {
        }
    }
}
