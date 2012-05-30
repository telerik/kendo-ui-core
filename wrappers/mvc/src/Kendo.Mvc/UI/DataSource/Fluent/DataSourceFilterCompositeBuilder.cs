namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class DataSourceFilterCompositeBuilder<TBuilder> : DataSourceFilterCompositeBuilderBase where TBuilder : DataSourceFilterDescriptorBuilderBase
    {
        public DataSourceFilterCompositeBuilder(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }

        public virtual TBuilder And()
        {
            FilterDescriptor previous = Descriptor.FilterDescriptors[Descriptor.FilterDescriptors.Count - 1] as FilterDescriptor;

            if (previous == null)
            {
                throw new InvalidCastException();
            }            

            FilterDescriptor descriptor = new FilterDescriptor { Member = previous.Member };

            Descriptor.LogicalOperator = FilterCompositionLogicalOperator.And;
            Descriptor.FilterDescriptors.Add(descriptor);

            TBuilder builder = (TBuilder) Activator.CreateInstance(typeof(TBuilder), new object[] { Descriptor });

            return builder;
        }

        public virtual TBuilder Or()
        {
            FilterDescriptor previous = Descriptor.FilterDescriptors[Descriptor.FilterDescriptors.Count - 1] as FilterDescriptor;

            if (previous == null)
            {
                throw new InvalidCastException();
            }

            FilterDescriptor descriptor = new FilterDescriptor { Member = previous.Member };

            Descriptor.LogicalOperator = FilterCompositionLogicalOperator.Or;

            Descriptor.FilterDescriptors.Add(descriptor);

            TBuilder builder = (TBuilder)Activator.CreateInstance(typeof(TBuilder), new object[] { Descriptor });

            return builder;
        }
    }    
}