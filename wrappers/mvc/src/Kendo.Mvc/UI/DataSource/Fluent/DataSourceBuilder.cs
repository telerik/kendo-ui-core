using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public class DataSourceBuilder : IHideObjectMembers
    {
        private readonly DataSource dataSource;
        private readonly IUrlGenerator urlGenerator;
        private readonly ViewContext viewContext;

        public DataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        public DataSourceBuilder Read(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Read, viewContext, urlGenerator));

            return this;
        }

        public DataSourceBuilder PageSize(int pageSize)
        {
            dataSource.PageSize = pageSize;
            return this;
        }

        public DataSourceBuilder ServerPaging(bool enabled)
        {
            dataSource.ServerPaging = enabled;
            return this;
        }

        public DataSourceBuilder ServerPaging()
        {
            dataSource.ServerPaging = true;
            return this;
        }

        public DataSourceBuilder ServerSorting(bool enabled)
        {
            dataSource.ServerSorting = enabled;
            return this;
        }

        public DataSourceBuilder ServerSorting()
        {
            dataSource.ServerSorting = true;
            return this;
        }

        public DataSourceBuilder ServerFiltering()
        {
            dataSource.ServerFiltering = true;
            return this;
        }

        public DataSourceBuilder ServerFiltering(bool enabled)
        {
            dataSource.ServerFiltering = enabled;
            return this;
        }
    }
}
