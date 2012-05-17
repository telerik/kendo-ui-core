namespace Kendo.Mvc.UI.Fluent
{
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
