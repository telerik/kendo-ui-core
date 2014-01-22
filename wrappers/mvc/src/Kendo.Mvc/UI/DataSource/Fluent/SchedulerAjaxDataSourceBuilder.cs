namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class SchedulerAjaxDataSourceBuilder<TModel> : AjaxDataSourceBuilder<TModel>, IHideObjectMembers
         where TModel : class
    {
        public SchedulerAjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Configures the initial filter.
        /// </summary>
        public override AjaxDataSourceBuilder<TModel> Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceSchedulerFilterDescriptorFactory<TModel>(dataSource.Filters));

            return this;
        }

        /// <summary>
        /// Use it to configure WebApi binding.
        /// </summary>        
        public SchedulerWebApiDataSourceBuilder<TModel> WebApi()
        {
            dataSource.Type = DataSourceType.WebApi;

            return new SchedulerWebApiDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public AjaxDataSourceBuilder<TModel> Model(Action<DataSourceSchedulerModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceSchedulerModelDescriptorFactory<TModel>((SchedulerModelDescriptor)dataSource.Schema.Model));

            return (AjaxDataSourceBuilder<TModel>)this;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override AjaxDataSourceBuilder<TModel> Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Sort method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override AjaxDataSourceBuilder<TModel> Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Group method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override AjaxDataSourceBuilder<TModel> Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {
            throw new MethodAccessException("Aggregates method is not available for Scheduler DataSource.");
        }
    }
}
