namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    public class CustomDataSourceBuilder<TModel> : CustomDataSourceBuilderBase<CustomDataSourceBuilder<TModel>>, IHideObjectMembers
        where TModel : class
    {
        public CustomDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        { 
        }

        /// <summary>
        /// Configures the transport of the DataSource
        /// </summary>
        public CustomDataSourceBuilder<TModel> Transport(Action<CustomDataSourceTransportBuilder> configurator)
        {
            configurator(new CustomDataSourceTransportBuilder(dataSource.Transport, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Configures Schema properties
        /// </summary>
        public CustomDataSourceBuilder<TModel> Schema(Action<CustomDataSourceSchemaBuilder<TModel>> configurator)
        {
            configurator(new CustomDataSourceSchemaBuilder<TModel>(dataSource.Schema));

            return this;
        }

        /// <summary>
        /// Configures the initial sorting.
        /// </summary>
        public virtual CustomDataSourceBuilder<TModel> Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceSortDescriptorFactory<TModel>(dataSource.OrderBy));

            return this;
        }

        /// <summary>
        /// Configures the initial grouping.
        /// </summary>
        public virtual CustomDataSourceBuilder<TModel> Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceGroupDescriptorFactory<TModel>(dataSource.Groups));

            return this;
        }

        /// <summary>
        /// Configures the initial aggregates.
        /// </summary>
        public virtual CustomDataSourceBuilder<TModel> Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {

            aggregates(new DataSourceAggregateDescriptorFactory<TModel>(dataSource.Aggregates));

            return this;
        }

        /// <summary>
        /// Configures the initial filter.
        /// </summary>
        public virtual CustomDataSourceBuilder<TModel> Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceFilterDescriptorFactory<TModel>(dataSource.Filters));

            return this;
        }

        /// <summary>
        /// Sets the type of the data source.
        /// </summary>
        /// <param name="type"></param>
        public CustomDataSourceBuilder<TModel> Type(string type)
        {
            dataSource.CustomType = type;

            return this;
        }
    }
}
