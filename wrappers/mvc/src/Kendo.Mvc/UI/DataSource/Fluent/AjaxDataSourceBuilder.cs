using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI.Fluent
{
    public class AjaxDataSourceBuilder<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly DataSource dataSource;
        private readonly IUrlGenerator urlGenerator;
        private readonly ViewContext viewContext;

        public AjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        public AjaxDataSourceBuilder<TModel> Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Read(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Read, viewContext, urlGenerator));

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Total(int total)
        {
            dataSource.Total = total;

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Update(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Update, viewContext, urlGenerator));

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Create(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Create, viewContext, urlGenerator));

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Destroy(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Destroy, viewContext, urlGenerator));

            return this;
        }

        public AjaxDataSourceBuilder<TModel> PageSize(int pageSize)
        {
            dataSource.PageSize = pageSize;
            return this;
        }

        public AjaxDataSourceBuilder<TModel> ServerOperation(bool enabled)
        {
            dataSource.ServerPaging = enabled;
            dataSource.ServerFiltering = enabled;
            dataSource.ServerAggregates = enabled;
            dataSource.ServerSorting = enabled;
            dataSource.ServerGrouping = enabled;

            return this;
        }

        public virtual AjaxDataSourceBuilder<TModel> Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new DataSourceSortDescriptorFactory<TModel>(dataSource.OrderBy));

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new DataSourceGroupDescriptorFactory<TModel>(dataSource.Groups));

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {
            Guard.IsNotNull(aggregates, "aggregates");   

            aggregates(new DataSourceAggregateDescriptorFactory<TModel>(dataSource.Aggregates));

            return this;
        }

        public virtual AjaxDataSourceBuilder<TModel> Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");                        

            configurator(new DataSourceFilterDescriptorFactory<TModel>(dataSource.Filters));

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Model(Action<DataSourceModelDescriptorFactory<TModel>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");            

            configurator(new DataSourceModelDescriptorFactory<TModel>(dataSource.Schema.Model));

            return this;
        }
    }
}
