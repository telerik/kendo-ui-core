namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class AjaxSchedulerDataSourceBuilder<TModel> : AjaxDataSourceBuilder<TModel>, IHideObjectMembers
         where TModel : class
    {
        public AjaxSchedulerDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
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
