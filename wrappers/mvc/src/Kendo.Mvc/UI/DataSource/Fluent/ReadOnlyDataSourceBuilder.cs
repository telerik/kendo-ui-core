namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Linq;
    using System.Web.Mvc;

    public class ReadOnlyDataSourceBuilder : IHideObjectMembers
    {
        private readonly DataSource dataSource;
        private readonly IUrlGenerator urlGenerator;
        private readonly ViewContext viewContext;

        public ReadOnlyDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        public ReadOnlyDataSourceBuilder Read(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Read, viewContext, urlGenerator));

            return this;
        }

        public ReadOnlyDataSourceBuilder ServerFiltering()
        {
            dataSource.ServerFiltering = true;
            return this;
        }

        public ReadOnlyDataSourceBuilder ServerFiltering(bool enabled)
        {
            dataSource.ServerFiltering = enabled;
            return this;
        }
    }
}
