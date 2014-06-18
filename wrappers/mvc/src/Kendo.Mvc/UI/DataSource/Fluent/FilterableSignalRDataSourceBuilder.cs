namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;

    public class FilterableSignalRDataSourceBuilder<TModel> : SignalRDataSourceBuilder<TModel>
        where TModel : class
    {
        public FilterableSignalRDataSourceBuilder(DataSource dataSource)
            : base(dataSource)
        {
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override SignalRDataSourceBuilder<TModel> Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Sort method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override SignalRDataSourceBuilder<TModel> Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Group method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override SignalRDataSourceBuilder<TModel> Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {
            throw new MethodAccessException("Aggregates method is not available for Scheduler DataSource.");
        }
    }
}
