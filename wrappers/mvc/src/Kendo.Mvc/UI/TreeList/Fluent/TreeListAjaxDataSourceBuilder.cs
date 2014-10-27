namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class TreeListAjaxDataSourceBuilder<TModel> : FilterableAjaxDataSourceBuilder<TModel, TreeListAjaxDataSourceBuilder<TModel>>
         where TModel : class
    {
        public TreeListAjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public TreeListAjaxDataSourceBuilder<TModel> Model(Action<DataSourceTreeListModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceTreeListModelDescriptorFactory<TModel>((TreeListModelDescriptor)dataSource.Schema.Model));

            return (TreeListAjaxDataSourceBuilder<TModel>)this;
        }
    }
}
