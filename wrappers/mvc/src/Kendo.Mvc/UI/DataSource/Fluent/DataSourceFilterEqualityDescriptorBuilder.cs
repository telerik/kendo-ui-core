namespace Kendo.Mvc.UI.Fluent
{
    public class DataSourceFilterEqualityDescriptorBuilder<TValue> : DataSourceFilterEqualityDescriptorBuilderBase<TValue, DataSourceFilterCompositeBuilder<DataSourceFilterEqualityDescriptorBuilder<TValue>>>
    {
        public DataSourceFilterEqualityDescriptorBuilder(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }
    }
}