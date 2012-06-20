namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Infrastructure;
    using Moq;

    public static class TreeViewTestHelper
    {
        public static Mock<INavigationItemAuthorization> authorization;
        public static UrlGenerator urlGenerator;

        public static ViewContext viewContext;

        public static TreeView CreateTreeView(HtmlTextWriter writer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            if (writer != null)
            {
                httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(writer);
            }

            urlGenerator = new UrlGenerator();
            authorization = new Mock<INavigationItemAuthorization>();

            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();

            var viewDataDinctionary = new ViewDataDictionary();
            viewDataDinctionary.Add("sample", TestHelper.CreateXmlSiteMap());

            viewDataContainer.SetupGet(container => container.ViewData).Returns(viewDataDinctionary);

            // needed for testing serialization

            viewContext = TestHelper.CreateViewContext();
            viewContext.ViewData = viewDataDinctionary;

            viewContext = TestHelper.CreateViewContext();
            viewContext.ViewData = viewDataDinctionary;

            authorization.Setup(a => a.IsAccessibleToUser(viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(true);
            var initializer = new Mock<IJavaScriptInitializer>();

            TreeView TreeView = new TreeView(viewContext, initializer.Object, urlGenerator, authorization.Object);

            return TreeView;
        }
    }
}
