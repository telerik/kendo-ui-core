namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using System;
    using System.Web.Mvc;

    public class WebApiDataSourceBuilderBaseTestDouble<TModel> : WebApiDataSourceBuilderBase<TModel, WebApiDataSourceBuilderBaseTestDouble<TModel>>
        where TModel : class
    {
        public WebApiDataSourceBuilderBaseTestDouble(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }
    }
}
