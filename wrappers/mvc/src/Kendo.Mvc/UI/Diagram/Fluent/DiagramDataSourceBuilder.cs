namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;
using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnection settings.
    /// </summary>
    public class DiagramDataSourceBuilder<TModel> : HierarchicalDataSourceBuilder<TModel>
        where TModel : class 
    {
        protected DataSource dataSource;
        protected readonly IUrlGenerator urlGenerator;
        protected readonly ViewContext viewContext;

        public DiagramDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;
        }

        public DiagramShapeDataSourceBuilder<TModel> ShapeDataSource()
        {
            this.dataSource.Schema.Data = "Data";
            this.dataSource.Schema.Total = "Total";
            this.dataSource.Schema.Errors = "Errors";
            dataSource.Schema.Model = new DiagramShapeModelDescriptor(typeof(TModel));
            return new DiagramShapeDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }
    }
}

