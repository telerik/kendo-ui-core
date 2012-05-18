namespace Kendo.Mvc.UI.Fluent
{
    public class DataSourceFilterStringDescriptorBuilder : DataSourceFilterEqualityDescriptorBuilderBase<string, DataSourceFilterCompositeBuilder<DataSourceFilterStringDescriptorBuilder>>
    {
        public DataSourceFilterStringDescriptorBuilder(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }

        public DataSourceFilterCompositeBuilder<DataSourceFilterStringDescriptorBuilder> StartsWith(string value)
        {
            SetOperatorAndValue(FilterOperator.StartsWith, value);

            return CreateBuilder();
        }

        public DataSourceFilterCompositeBuilder<DataSourceFilterStringDescriptorBuilder> EndsWith(string value)
        {
            SetOperatorAndValue(FilterOperator.EndsWith, value);

            return CreateBuilder();
        }

        public DataSourceFilterCompositeBuilder<DataSourceFilterStringDescriptorBuilder> Contains(string value)
        {
            SetOperatorAndValue(FilterOperator.Contains, value);

            return CreateBuilder();
        }

        public DataSourceFilterCompositeBuilder<DataSourceFilterStringDescriptorBuilder> DoesNotContain(string value)
        {
            SetOperatorAndValue(FilterOperator.DoesNotContain, value);

            return CreateBuilder();
        }
    }
}