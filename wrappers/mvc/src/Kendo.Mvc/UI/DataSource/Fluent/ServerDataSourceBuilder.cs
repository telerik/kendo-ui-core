using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public class ServerDataSourceBuilder<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly DataSource dataSource;
        private readonly IUrlGenerator urlGenerator;
        private readonly ViewContext viewContext;

        public ServerDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        public ServerDataSourceBuilder<TModel> Read(Action<ServerCrudOperationBuilder> configurator)
        {
            configurator(new ServerCrudOperationBuilder(dataSource.Transport.Read, viewContext, urlGenerator));

            return this;
        }

        public ServerDataSourceBuilder<TModel> Total(int total)
        {
            dataSource.Total = total;

            return this;
        }

        public ServerDataSourceBuilder<TModel> Update(Action<ServerCrudOperationBuilder> configurator)
        {
            configurator(new ServerCrudOperationBuilder(dataSource.Transport.Update, viewContext, urlGenerator));

            return this;
        }

        public ServerDataSourceBuilder<TModel> Create(Action<ServerCrudOperationBuilder> configurator)
        {
            configurator(new ServerCrudOperationBuilder(dataSource.Transport.Create, viewContext, urlGenerator));

            return this;
        }

        public ServerDataSourceBuilder<TModel> Destroy(Action<ServerCrudOperationBuilder> configurator)
        {
            configurator(new ServerCrudOperationBuilder(dataSource.Transport.Destroy, viewContext, urlGenerator));

            return this;
        }

        public ServerDataSourceBuilder<TModel> PageSize(int pageSize)
        {
            dataSource.PageSize = pageSize;
            return this;
        }

        public virtual ServerDataSourceBuilder<TModel> Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceSortDescriptorFactory<TModel>(dataSource.OrderBy));

            return this;
        }

        public ServerDataSourceBuilder<TModel> Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceGroupDescriptorFactory<TModel>(dataSource.Groups));

            return this;
        }

        public ServerDataSourceBuilder<TModel> Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {
            aggregates(new DataSourceAggregateDescriptorFactory<TModel>(dataSource.Aggregates));

            return this;
        }

        public virtual ServerDataSourceBuilder<TModel> Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceFilterDescriptorFactory<TModel>(dataSource.Filters));

            return this;
        }

        public ServerDataSourceBuilder<TModel> Model(Action<DataSourceModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceModelDescriptorFactory<TModel>(dataSource.Schema.Model));

            return this;
        }
    }
}
