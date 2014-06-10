namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.Infrastructure;
    using Moq;
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;

    public class PivotGridTestHelper
    {
        public static PivotGrid CreatePivotGrid(HtmlTextWriter writer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            if (writer != null)
            {
                httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(writer);
            }

            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();
            Mock<IUrlGenerator> urlGenerator = new Mock<IUrlGenerator>();

            viewDataContainer.SetupGet(container => container.ViewData).Returns(new ViewDataDictionary());

            ViewContext viewContext = TestHelper.CreateViewContext();

            var initializer = new Mock<IJavaScriptInitializer>();

            PivotGrid pivotGrid = new PivotGrid(viewContext, initializer.Object, urlGenerator.Object) { Name = "pivotGrid" };

            return pivotGrid;
        }
    }
}
