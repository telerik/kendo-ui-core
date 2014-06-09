namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Linq;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGridDataSource"/> component.
    /// </summary>
    public class PivotGridDataSourceBuilder : IHideObjectMembers
    {
        protected readonly PivotGridDataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public PivotGridDataSourceBuilder(PivotGridDataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        /// <summary>
        /// Use it to configure Xmla binding.
        /// </summary>
        public PivotGridXmlaDataSourceBuilder Xmla()
        {
            dataSource.Type = DataSourceType.Custom;
            dataSource.CustomType = "xmla";
            dataSource.Schema.Type = "xmla";
            return new PivotGridXmlaDataSourceBuilder(dataSource, viewContext, urlGenerator);
        }
    }
}
