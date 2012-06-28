using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public abstract class AjaxDataSourceBuilderBase<TModel, TDataSourceBuilder> : IHideObjectMembers
        where TModel : class
        where TDataSourceBuilder : AjaxDataSourceBuilderBase<TModel, TDataSourceBuilder>
    {
        protected readonly DataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public AjaxDataSourceBuilderBase(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        public TDataSourceBuilder Events(Action<DataSourceEventBuilder> configurator)
        {
            configurator(new DataSourceEventBuilder(dataSource.Events));

            return (TDataSourceBuilder)this;
        }

        public TDataSourceBuilder Read(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Read, viewContext, urlGenerator));

            return (TDataSourceBuilder)this;
        }

        public TDataSourceBuilder Read(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, routeValues);

            return (TDataSourceBuilder)this;
        }

        public TDataSourceBuilder Read(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Read, actionName, controllerName, null);

            return (TDataSourceBuilder)this;
        }

        public TDataSourceBuilder Total(int total)
        {
            dataSource.Total = total;

            return (TDataSourceBuilder)this;
        }

        public TDataSourceBuilder PageSize(int pageSize)
        {
            dataSource.PageSize = pageSize;
            return (TDataSourceBuilder)this;
        }

        public TDataSourceBuilder ServerOperation(bool enabled)
        {
            dataSource.ServerPaging = enabled;
            dataSource.ServerFiltering = enabled;
            dataSource.ServerAggregates = enabled;
            dataSource.ServerSorting = enabled;
            dataSource.ServerGrouping = enabled;

            return (TDataSourceBuilder)this;
        }

        public virtual TDataSourceBuilder Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceSortDescriptorFactory<TModel>(dataSource.OrderBy));

            return (TDataSourceBuilder)this;
        }

        public TDataSourceBuilder Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceGroupDescriptorFactory<TModel>(dataSource.Groups));

            return (TDataSourceBuilder)this;
        }

        public TDataSourceBuilder Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {

            aggregates(new DataSourceAggregateDescriptorFactory<TModel>(dataSource.Aggregates));

            return (TDataSourceBuilder)this;
        }

        public virtual TDataSourceBuilder Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceFilterDescriptorFactory<TModel>(dataSource.Filters));

            return (TDataSourceBuilder)this;
        }

        protected virtual void SetOperationUrl(CrudOperation operation, string actionName, string controllerName, object routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
