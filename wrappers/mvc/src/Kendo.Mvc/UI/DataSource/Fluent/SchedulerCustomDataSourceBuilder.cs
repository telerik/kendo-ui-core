namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class SchedulerCustomDataSourceBuilder<TModel> : CustomDataSourceBuilder<TModel>
        where TModel : class
    {
        public SchedulerCustomDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override CustomDataSourceBuilder<TModel> Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Sort method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override CustomDataSourceBuilder<TModel> Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Group method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override CustomDataSourceBuilder<TModel> Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {
            throw new MethodAccessException("Aggregates method is not available for Scheduler DataSource.");
        }
    }
}
