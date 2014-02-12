namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using System.Web.Mvc;

    public class WebApiDataSourceBuilderBaseDouble<TModel> : WebApiDataSourceBuilderBase<TModel, WebApiDataSourceBuilderBaseDouble<TModel>>
        where TModel : class
    {
        public WebApiDataSourceBuilderBaseDouble(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }
    }
}
