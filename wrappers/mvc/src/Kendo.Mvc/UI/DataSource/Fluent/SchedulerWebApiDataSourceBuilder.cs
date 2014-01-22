namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class SchedulerWebApiDataSourceBuilder<TModel> : WebApiDataSourceBuilder<TModel>, IHideObjectMembers
         where TModel : class
    {
        public SchedulerWebApiDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Configures the initial filter.
        /// </summary>
        public override WebApiDataSourceBuilder<TModel> Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceSchedulerFilterDescriptorFactory<TModel>(dataSource.Filters));

            return this;
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public WebApiDataSourceBuilder<TModel> Model(Action<DataSourceSchedulerModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceSchedulerModelDescriptorFactory<TModel>((SchedulerModelDescriptor)dataSource.Schema.Model));

            return (WebApiDataSourceBuilder<TModel>)this;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override WebApiDataSourceBuilder<TModel> Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Sort method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override WebApiDataSourceBuilder<TModel> Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Group method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override WebApiDataSourceBuilder<TModel> Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {
            throw new MethodAccessException("Aggregates method is not available for Scheduler DataSource.");
        }
    }
}
