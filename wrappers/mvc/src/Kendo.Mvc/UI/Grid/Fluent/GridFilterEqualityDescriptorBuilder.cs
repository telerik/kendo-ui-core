namespace Kendo.Mvc.UI.Fluent
{
    public class GridFilterEqualityDescriptorBuilder<TValue> : GridFilterEqualityDescriptorBuilderBase<TValue, GridFilterCompositeBuilder<GridFilterEqualityDescriptorBuilder<TValue>>>
    {
        public GridFilterEqualityDescriptorBuilder(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }
    }
}