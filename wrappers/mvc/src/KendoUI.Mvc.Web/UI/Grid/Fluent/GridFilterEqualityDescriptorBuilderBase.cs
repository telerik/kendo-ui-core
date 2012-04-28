namespace KendoUI.Mvc.UI.Fluent
{
    using System;

    public abstract class GridFilterEqualityDescriptorBuilderBase<TValue, TCompositeBuilder> : GridFilterDescriptorBuilderBase where TCompositeBuilder : GridFilterCompositeBuilderBase
    {
        protected GridFilterEqualityDescriptorBuilderBase(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }

        public TCompositeBuilder IsEqualTo(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsEqualTo, value);

            return CreateBuilder();
        }

        public TCompositeBuilder IsNotEqualTo(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsNotEqualTo, value);

            return CreateBuilder();
        }

        protected TCompositeBuilder CreateBuilder()
        {
            return (TCompositeBuilder) Activator.CreateInstance(typeof(TCompositeBuilder), new object[] { Descriptor });
        }
    }
}