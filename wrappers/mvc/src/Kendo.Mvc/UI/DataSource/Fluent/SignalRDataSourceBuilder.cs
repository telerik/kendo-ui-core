namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class SignalRDataSourceBuilder<TModel> : SignalRDataSourceBuilderBase<SignalRDataSourceBuilder<TModel>>, IHideObjectMembers
        where TModel : class
    {
        public SignalRDataSourceBuilder(DataSource dataSource)
            : base(dataSource)
        { 
        }

        /// <summary>
        /// Configures the transport of the DataSource
        /// </summary>
        public SignalRDataSourceBuilder<TModel> Transport(Action<SignalRDataSourceTransportBuilder> configurator)
        {
            configurator(new SignalRDataSourceTransportBuilder(dataSource.Transport));

            return this;
        }

        /// <summary>
        /// Configures Schema properties
        /// </summary>
        public SignalRDataSourceBuilder<TModel> Schema(Action<CustomDataSourceSchemaBuilder<TModel>> configurator)
        {
            configurator(new CustomDataSourceSchemaBuilder<TModel>(dataSource.Schema));

            return this;
        }

        /// <summary>
        /// Configures the initial sorting.
        /// </summary>
        public virtual SignalRDataSourceBuilder<TModel> Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceSortDescriptorFactory<TModel>(dataSource.OrderBy));

            return this;
        }

        /// <summary>
        /// Configures the initial grouping.
        /// </summary>
        public virtual SignalRDataSourceBuilder<TModel> Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceGroupDescriptorFactory<TModel>(dataSource.Groups));

            return this;
        }

        /// <summary>
        /// Configures the initial aggregates.
        /// </summary>
        public virtual SignalRDataSourceBuilder<TModel> Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {

            aggregates(new DataSourceAggregateDescriptorFactory<TModel>(dataSource.Aggregates));

            return this;
        }

        /// <summary>
        /// Configures the initial filter.
        /// </summary>
        public virtual SignalRDataSourceBuilder<TModel> Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceFilterDescriptorFactory<TModel>(dataSource.Filters));

            return this;
        }
    }
}
