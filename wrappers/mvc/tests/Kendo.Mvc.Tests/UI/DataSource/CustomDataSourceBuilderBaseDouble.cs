namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using System.Web.Mvc;

    public class CustomDataSourceBuilderBaseDouble : CustomDataSourceBuilderBase<CustomDataSourceBuilderBaseDouble>
    {
        public CustomDataSourceBuilderBaseDouble(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }
    }
}
