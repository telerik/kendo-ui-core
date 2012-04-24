namespace KendoUI.Mvc.UI.Fluent
{
    public class GridFilterComparisonDescriptorBuilder<TValue> : GridFilterComparisonDescriptorBuilderBase<TValue, GridFilterCompositeBuilder<GridFilterComparisonDescriptorBuilder<TValue>>>
    {
        public GridFilterComparisonDescriptorBuilder(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }
    }
}