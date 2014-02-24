namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring filter.
    /// </summary>    
    public class ReadOnlyCustomDataSourceFilterDescriptorFactory : DataSourceFilterDescriptorFactoryBase
    {
        public ReadOnlyCustomDataSourceFilterDescriptorFactory(IList<IFilterDescriptor> filters)
            : base(filters)
        {
        }
    }
}
