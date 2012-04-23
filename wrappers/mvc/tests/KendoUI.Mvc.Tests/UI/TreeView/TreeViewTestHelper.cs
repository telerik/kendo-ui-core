namespace Telerik.Web.Mvc.UI.Tests
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

        public static TreeView CreateTreeView(HtmlTextWriter writer, ITreeViewHtmlBuilder renderer, IClientSideObjectWriter clientSideObjectWriter)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            if (writer != null)
            {
                httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(writer);
            }

            urlGenerator = new UrlGenerator();
            authorization = new Mock<INavigationItemAuthorization>();

            Mock<ITreeViewHtmlBuilderFactory> TreeViewRendererFactory = new Mock<ITreeViewHtmlBuilderFactory>();

            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();

            var viewDataDinctionary = new ViewDataDictionary();
            viewDataDinctionary.Add("sample", TestHelper.CreateXmlSiteMap());

            viewDataContainer.SetupGet(container => container.ViewData).Returns(viewDataDinctionary);

            // needed for testing serialization
            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();

            viewContext = TestHelper.CreateViewContext();
            viewContext.ViewData = viewDataDinctionary;

            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter);

            viewContext = TestHelper.CreateViewContext();
            viewContext.ViewData = viewDataDinctionary;

            authorization.Setup(a => a.IsAccessibleToUser(viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(true);

            TreeView TreeView = new TreeView(viewContext, clientSideObjectWriterFactory.Object, urlGenerator, authorization.Object, TreeViewRendererFactory.Object);

            renderer = renderer ?? new TreeViewHtmlBuilder(TreeView, new Mock<IActionMethodCache>().Object);
            TreeViewRendererFactory.Setup(f => f.Create(It.IsAny<TreeView>())).Returns(renderer);

            return TreeView;
        }
    }
}
