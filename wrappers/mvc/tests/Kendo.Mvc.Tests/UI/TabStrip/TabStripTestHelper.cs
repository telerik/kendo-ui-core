namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Infrastructure;
    using Moq;

    public static class TabStripTestHelper
    {
        public static Mock<INavigationItemAuthorization> authorization;
        public static Mock<IUrlGenerator> urlGenerator;

        public static ViewContext viewContext;

        public static TabStrip CreateTabStrip(HtmlTextWriter writer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            if (writer != null)
            {
                httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(writer);
            }

            urlGenerator = new Mock<IUrlGenerator>();
            authorization = new Mock<INavigationItemAuthorization>();

            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();

            var viewDataDinctionary = new ViewDataDictionary();
            viewDataDinctionary.Add("sample", TestHelper.CreateXmlSiteMap());

            viewDataContainer.SetupGet(container => container.ViewData).Returns(viewDataDinctionary);

            viewContext = TestHelper.CreateViewContext();
            viewContext.ViewData = viewDataDinctionary;

            authorization.Setup(a => a.IsAccessibleToUser(viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(true);


            var initializer = new Mock<IJavaScriptInitializer>();

            TabStrip tabStrip = new TabStrip(viewContext, initializer.Object, urlGenerator.Object, authorization.Object);

            return tabStrip;
        }
    }
}
