using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public class AjaxDataSourceBuilder<TModel> : ReadOnlyAjaxDataSourceBuilder<TModel>, IHideObjectMembers
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

        public virtual ReadOnlyAjaxDataSourceBuilder<TModel> Model(Action<DataSourceModelDescriptorFactory<TModel>> configurator)
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
