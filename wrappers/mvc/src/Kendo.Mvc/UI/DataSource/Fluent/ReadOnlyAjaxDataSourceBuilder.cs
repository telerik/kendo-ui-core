using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public class ReadOnlyAjaxDataSourceBuilder<TModel> : IHideObjectMembers
        where TModel : class
    {
        protected readonly DataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public ReadOnlyAjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        public ReadOnlyAjaxDataSourceBuilder<TModel> Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return this;
        }

        public ReadOnlyAjaxDataSourceBuilder<TModel> Read(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Read, viewContext, urlGenerator));

            return this;
        }

        public ReadOnlyAjaxDataSourceBuilder<TModel> Total(int total)
        {
            dataSource.Total = total;

            return this;
        }

        public ReadOnlyAjaxDataSourceBuilder<TModel> PageSize(int pageSize)
        {
            dataSource.PageSize = pageSize;
            return this;
        }

        public ReadOnlyAjaxDataSourceBuilder<TModel> ServerOperation(bool enabled)
        {
            dataSource.ServerPaging = enabled;
            dataSource.ServerFiltering = enabled;
            dataSource.ServerAggregates = enabled;
            dataSource.ServerSorting = enabled;
            dataSource.ServerGrouping = enabled;

            return this;
        }

        public virtual ReadOnlyAjaxDataSourceBuilder<TModel> Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceSortDescriptorFactory<TModel>(dataSource.OrderBy));

            return this;
        }

        public ReadOnlyAjaxDataSourceBuilder<TModel> Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceGroupDescriptorFactory<TModel>(dataSource.Groups));

            return this;
        }

        public ReadOnlyAjaxDataSourceBuilder<TModel> Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {

            aggregates(new DataSourceAggregateDescriptorFactory<TModel>(dataSource.Aggregates));

            return this;
        }

        public virtual ReadOnlyAjaxDataSourceBuilder<TModel> Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceFilterDescriptorFactory<TModel>(dataSource.Filters));

            return this;
        }
    }
}
