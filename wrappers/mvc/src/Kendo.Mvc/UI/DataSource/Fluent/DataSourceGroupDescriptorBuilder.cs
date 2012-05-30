namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class DataSourceGroupDescriptorBuilder<T>
        where T : class
    {
        private readonly GroupDescriptor descriptor;
        
        public DataSourceGroupDescriptorBuilder(GroupDescriptor descriptor)
        {
            this.descriptor = descriptor;
        }       

    }
}
