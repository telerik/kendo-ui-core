namespace Kendo.Mvc.UI.Fluent
{
    public abstract class DataSourceFilterComparisonDescriptorBuilderBase<TValue, TCompositeBuilder> : DataSourceFilterEqualityDescriptorBuilderBase<TValue, TCompositeBuilder> where TCompositeBuilder : DataSourceFilterCompositeBuilderBase
    {
        protected DataSourceFilterComparisonDescriptorBuilderBase(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }

        public TCompositeBuilder IsLessThan(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsLessThan, value);

            return CreateBuilder();
        }

        public TCompositeBuilder IsLessThanOrEqualTo(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsLessThanOrEqualTo, value);

            return CreateBuilder();
        }

        public TCompositeBuilder IsGreaterThanOrEqualTo(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsGreaterThanOrEqualTo, value);

            return CreateBuilder();
        }

        public TCompositeBuilder IsGreaterThan(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsGreaterThan, value);

            return CreateBuilder();
        }
    }
}