namespace Telerik.Web.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;

    using Infrastructure;

    using Moq;
    using UI;

    public static class PanelBarTestHelper
    {
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;

        public static PanelBar CreatePanelbar()
        {
            return CreatePanelbar(new HtmlTextWriter(TextWriter.Null), new Mock<INavigationComponentHtmlBuilder<PanelBarItem>>().Object);
        }

        public static PanelBar CreatePanelbar(HtmlTextWriter writer, INavigationComponentHtmlBuilder<PanelBarItem> renderer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            if (writer != null)
            {
               httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(writer);
            }

            Mock<INavigationComponentHtmlBuilderFactory<PanelBar, PanelBarItem>> panelBarRendererFactory = new Mock<INavigationComponentHtmlBuilderFactory<PanelBar, PanelBarItem>>();

            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();
            var viewDataDinctionary = new ViewDataDictionary();
            viewDataDinctionary.Add("sample", TestHelper.CreateXmlSiteMap());

            viewDataContainer.SetupGet(container => container.ViewData).Returns(viewDataDinctionary);

            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();
            IUrlGenerator urlGeneratorObject = new UrlGenerator();
            Mock<INavigationItemAuthorization> authorization = new Mock<INavigationItemAuthorization>();

            TestHelper.RegisterDummyRoutes();

            ViewContext viewContext = TestHelper.CreateViewContext();
            viewContext.ViewData = viewDataDinctionary;

            authorization.Setup(a => a.IsAccessibleToUser(viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(true);
            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter.Object);

            PanelBar panelBar = new PanelBar(viewContext, clientSideObjectWriterFactory.Object, urlGeneratorObject, authorization.Object, panelBarRendererFactory.Object);

            renderer = renderer ?? new PanelBarHtmlBuilder(panelBar, new Mock<IActionMethodCache>().Object);
            panelBarRendererFactory.Setup(f => f.Create(It.IsAny<PanelBar>())).Returns(renderer);

            return panelBar;
        }
    }
}
