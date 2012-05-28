using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
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

        public AjaxDataSourceBuilder<TModel> Ajax()
        {
            dataSource.Type = DataSourceType.Ajax;

            return new AjaxDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }

        public ServerDataSourceBuilder<TModel> Server()
        {
            dataSource.Type = DataSourceType.Server;

            return new ServerDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }
    }
}
