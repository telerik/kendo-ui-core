namespace Telerik.Web.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Infrastructure;
    using Moq;

    public static class TabStripTestHelper
    {
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;
        public static Mock<INavigationItemAuthorization> authorization;
        public static Mock<IUrlGenerator> urlGenerator;

        public static ViewContext viewContext;

        public static TabStrip CreateTabStrip(HtmlTextWriter writer, ITabStripHtmlBuilder renderer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            if (writer != null)
            {
                httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(writer);
            }

            urlGenerator = new Mock<IUrlGenerator>();
            authorization = new Mock<INavigationItemAuthorization>();

            Mock<ITabStripHtmlBuilderFactory> tabStripRendererFactory = new Mock<ITabStripHtmlBuilderFactory>();

            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();

            var viewDataDinctionary = new ViewDataDictionary();
            viewDataDinctionary.Add("sample", TestHelper.CreateXmlSiteMap());

            viewDataContainer.SetupGet(container => container.ViewData).Returns(viewDataDinctionary);

            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();

            viewContext = TestHelper.CreateViewContext();
            viewContext.ViewData = viewDataDinctionary;

            authorization.Setup(a => a.IsAccessibleToUser(viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(true);

            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter.Object);

            TabStrip tabStrip = new TabStrip(viewContext, clientSideObjectWriterFactory.Object, urlGenerator.Object, authorization.Object, tabStripRendererFactory.Object);

            renderer = renderer ?? new TabStripHtmlBuilder(tabStrip, new Mock<IActionMethodCache>().Object);
            tabStripRendererFactory.Setup(f => f.Create(It.IsAny<TabStrip>())).Returns(renderer);

            return tabStrip;
        }
    }
}
