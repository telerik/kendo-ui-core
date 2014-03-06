namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class SignalRHierarchicalDataSourceBuilder : SignalRDataSourceBuilderBase<SignalRHierarchicalDataSourceBuilder>, IHideObjectMembers
    {
        public SignalRHierarchicalDataSourceBuilder(DataSource dataSource)
            : base(dataSource)
        {
        }
        
        /// <summary>
        /// Configures the transport of the DataSource
        /// </summary>
        public SignalRHierarchicalDataSourceBuilder Transport(Action<ReadOnlySignalRDataSourceTransportBuilder> configurator)
        {
            configurator(new ReadOnlySignalRDataSourceTransportBuilder(dataSource.Transport));

            return this;
        }

        /// <summary>
        /// Configures Schema properties
        /// </summary>
        public SignalRHierarchicalDataSourceBuilder Schema(Action<SignalRHierarchicalDataSourceSchemaBuilder<object>> configurator)
        {
            configurator(new SignalRHierarchicalDataSourceSchemaBuilder<object>(dataSource.Schema));

            return this;
        }

        /// <summary>
        /// Configures the initial filter.
        /// </summary>
        public virtual SignalRHierarchicalDataSourceBuilder Filter(Action<ReadOnlyCustomDataSourceFilterDescriptorFactory> configurator)
        {
            configurator(new ReadOnlyCustomDataSourceFilterDescriptorFactory(dataSource.Filters));

            return this;
        }

        /// <summary>
        /// Configures the initial sort.
        /// </summary>
        public virtual SignalRHierarchicalDataSourceBuilder Sort(Action<ReadOnlyCustomDataSourceSortDescriptorFactory> configurator)
        {
            configurator(new ReadOnlyCustomDataSourceSortDescriptorFactory(dataSource.OrderBy));

            return this;
        }
    }
}
