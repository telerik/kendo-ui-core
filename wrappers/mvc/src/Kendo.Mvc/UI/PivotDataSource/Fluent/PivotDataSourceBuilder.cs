namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Linq;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSource"/> component.
    /// </summary>
    public class PivotDataSourceBuilder : IHideObjectMembers
    {
        protected readonly PivotDataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public PivotDataSourceBuilder(PivotDataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        /// <summary>
        /// Use it to configure Xmla binding.
        /// </summary>
        public PivotXmlaDataSourceBuilder Xmla()
        {
            dataSource.Type = PivotDataSourceType.Xmla;
            dataSource.Schema.Type = "xmla";
            return new PivotXmlaDataSourceBuilder(dataSource, viewContext, urlGenerator);
        }

        /// <summary>
        /// Use it to configure Custom binding.
        /// </summary>
        public PivotCustomDataSourceBuilder Custom()
        {
            dataSource.Type = PivotDataSourceType.Custom;
            return new PivotCustomDataSourceBuilder(dataSource, viewContext, urlGenerator);
        }
    }
}
