namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    public class CustomHierarchicalDataSourceBuilder : CustomDataSourceBuilderBase<CustomHierarchicalDataSourceBuilder>
    {
        public CustomHierarchicalDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        { 
        }

        /// <summary>
        /// Configures the transport of the DataSource
        /// </summary>
        public CustomHierarchicalDataSourceBuilder Transport(Action<ReadOnlyCustomDataSourceTransportBuilder> configurator)
        {
            configurator(new ReadOnlyCustomDataSourceTransportBuilder(dataSource.Transport, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Configures Schema properties
        /// </summary>
        public CustomHierarchicalDataSourceBuilder Schema(Action<CustomHierarchicalDataSourceSchemaBuilder<object>> configurator)
        {
            configurator(new CustomHierarchicalDataSourceSchemaBuilder<object>(dataSource.Schema, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Configures the initial filter.
        /// </summary>
        public virtual CustomHierarchicalDataSourceBuilder Filter(Action<ReadOnlyCustomDataSourceFilterDescriptorFactory> configurator)
        {
            configurator(new ReadOnlyCustomDataSourceFilterDescriptorFactory(dataSource.Filters));

            return this;
        }

        /// <summary>
        /// Configures the initial sort.
        /// </summary>
        public virtual CustomHierarchicalDataSourceBuilder Sort(Action<ReadOnlyCustomDataSourceSortDescriptorFactory> configurator)
        {
            configurator(new ReadOnlyCustomDataSourceSortDescriptorFactory(dataSource.OrderBy));

            return this;
        }
    }
}
