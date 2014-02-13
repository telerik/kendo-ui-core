namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class ListViewAjaxDataSourceBuilder<TModel> : AjaxDataSourceBuilder<TModel>, IHideObjectMembers
         where TModel : class
    {
        public ListViewAjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Use it to configure WebApi binding.
        /// </summary>        
        public WebApiDataSourceBuilder<TModel> WebApi()
        {
            dataSource.Type = DataSourceType.WebApi;

            return new WebApiDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }

        /// <summary>
        /// Use it to configure Custom binding.
        /// </summary>
        public CustomDataSourceBuilder<TModel> Custom()
        {
            dataSource.Type = DataSourceType.Custom;

            return new CustomDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }
    }
}
