namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring filter.
    /// </summary>    
    public abstract class DataSourceFilterDescriptorFactoryBase
    {
        public DataSourceFilterDescriptorFactoryBase(IList<IFilterDescriptor> filters)
        {
            Filters = filters;
        }

        protected IList<IFilterDescriptor> Filters { get; private set; }

        public virtual void AddRange(IEnumerable<IFilterDescriptor> filters)
        {
            foreach (var filter in filters)
            {
                var composite = filter as CompositeFilterDescriptor;

                if (composite == null)
                {
                    composite = new CompositeFilterDescriptor
                    {
                        LogicalOperator = FilterCompositionLogicalOperator.And
                    };

                    composite.FilterDescriptors.Add(filter);
                }

                Filters.Add(composite);
            }
        }
    }
}
