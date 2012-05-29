namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;

    using Infrastructure;

    using Moq;

    public static class PanelBarTestHelper
    {
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

            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();
            var viewDataDinctionary = new ViewDataDictionary();
            viewDataDinctionary.Add("sample", TestHelper.CreateXmlSiteMap());

            viewDataContainer.SetupGet(container => container.ViewData).Returns(viewDataDinctionary);

            IUrlGenerator urlGeneratorObject = new UrlGenerator();
            Mock<INavigationItemAuthorization> authorization = new Mock<INavigationItemAuthorization>();

            TestHelper.RegisterDummyRoutes();

            ViewContext viewContext = TestHelper.CreateViewContext();
            viewContext.ViewData = viewDataDinctionary;

            authorization.Setup(a => a.IsAccessibleToUser(viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(true);

            PanelBar panelBar = new PanelBar(viewContext, new JavaScriptInitializer(), urlGeneratorObject, authorization.Object);

            renderer = renderer ?? new PanelBarHtmlBuilder(panelBar, new Mock<IActionMethodCache>().Object);

            return panelBar;
        }
    }
}
