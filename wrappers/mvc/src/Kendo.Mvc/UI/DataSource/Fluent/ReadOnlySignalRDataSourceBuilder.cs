namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class ReadOnlySignalRDataSourceBuilder : SignalRDataSourceBuilderBase<ReadOnlySignalRDataSourceBuilder>, IHideObjectMembers
    {
        public ReadOnlySignalRDataSourceBuilder(DataSource dataSource)
            : base(dataSource)
        { 
        }

        /// <summary>
        /// Configures the transport of the DataSource
        /// </summary>                
        public ReadOnlySignalRDataSourceBuilder Transport(Action<ReadOnlySignalRDataSourceTransportBuilder> configurator)
        {
            configurator(new ReadOnlySignalRDataSourceTransportBuilder(dataSource.Transport));

            return this;
        }

        /// <summary>
        /// Configures Schema properties
        /// </summary>
        public ReadOnlySignalRDataSourceBuilder Schema(Action<ReadOnlyCustomDataSourceSchemaBuilder<object>> configurator)
        {
            configurator(new ReadOnlyCustomDataSourceSchemaBuilder<object>(dataSource.Schema));

            return this;
        }

        /// <summary>
        /// Configures the initial filter.
        /// </summary>
        public virtual ReadOnlySignalRDataSourceBuilder Filter(Action<ReadOnlyCustomDataSourceFilterDescriptorFactory> configurator)
        {
            configurator(new ReadOnlyCustomDataSourceFilterDescriptorFactory(dataSource.Filters));

            return this;
        }

        /// <summary>
        /// Configures the initial sort.
        /// </summary>
        public virtual ReadOnlySignalRDataSourceBuilder Sort(Action<ReadOnlyCustomDataSourceSortDescriptorFactory> configurator)
        {
            configurator(new ReadOnlyCustomDataSourceSortDescriptorFactory(dataSource.OrderBy));

            return this;
        }
    }
}
