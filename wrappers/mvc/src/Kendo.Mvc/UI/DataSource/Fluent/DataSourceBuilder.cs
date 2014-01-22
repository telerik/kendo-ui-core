using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> component.
    /// </summary>
    public class DataSourceBuilder<TModel> : IHideObjectMembers
        where TModel : class
    {
        protected readonly DataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public DataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        /// <summary>
        /// Use it to configure Ajax binding.
        /// </summary>        
        public AjaxDataSourceBuilder<TModel> Ajax()
        {
            dataSource.Type = DataSourceType.Ajax;

            return new AjaxDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }

        /// <summary>
        /// Use it to configure Server binding.
        /// </summary>        
        public ServerDataSourceBuilder<TModel> Server()
        {
            dataSource.Type = DataSourceType.Server;

            return new ServerDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }

        /// <summary>
        /// Use it to configure WebApi binding.
        /// </summary>
        public AjaxDataSourceBuilder<TModel> WebApi()
        {
            dataSource.Type = DataSourceType.WebApi;

            return new AjaxDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }
    }
}
