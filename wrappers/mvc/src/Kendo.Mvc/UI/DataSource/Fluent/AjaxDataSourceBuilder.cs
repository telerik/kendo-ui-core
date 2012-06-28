using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public class AjaxDataSourceBuilder<TModel> : AjaxDataSourceBuilderBase<TModel, AjaxDataSourceBuilder<TModel>>, IHideObjectMembers
        where TModel : class
    {
        public AjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        public AjaxDataSourceBuilder<TModel> Update(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Update, viewContext, urlGenerator));

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Update(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Update, actionName, controllerName, null);

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Update(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Update, actionName, controllerName, routeValues);

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Create(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Create, viewContext, urlGenerator));

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Create(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Create, actionName, controllerName, null);

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Create(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Create, actionName, controllerName, routeValues);

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Destroy(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Destroy, viewContext, urlGenerator));

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Destroy(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Destroy, actionName, controllerName, null);

            return this;
        }

        public AjaxDataSourceBuilder<TModel> Destroy(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Destroy, actionName, controllerName, routeValues);

            return this;
        }

        public virtual AjaxDataSourceBuilder<TModel> Model(Action<DataSourceModelDescriptorFactory<TModel>> configurator)
        {

            configurator(new DataSourceModelDescriptorFactory<TModel>(dataSource.Schema.Model));

            return this;
        }

        public virtual AjaxDataSourceBuilder<TModel> Batch(bool enabled)
        {
            dataSource.Batch = enabled;

            return this;
        }
    }
}
