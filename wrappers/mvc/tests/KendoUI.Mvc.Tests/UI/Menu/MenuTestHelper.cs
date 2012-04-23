namespace Telerik.Web.Mvc.UI
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Infrastructure;
    using Moq;

	public static class MenuTestHelper
	{
        public static Menu CreateMenu()
        {
            return CreateMenu(new HtmlTextWriter(TextWriter.Null), new Mock<INavigationComponentHtmlBuilder<MenuItem>>().Object);
        }

        public static Menu CreateMenu(HtmlTextWriter writer, INavigationComponentHtmlBuilder<MenuItem> renderer)
		{
			Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

			if (writer != null)
			{
				httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(writer);
			}

            Mock<INavigationComponentHtmlBuilderFactory<Menu, MenuItem>> menuRendererFactory = new Mock<INavigationComponentHtmlBuilderFactory<Menu, MenuItem>>();

			Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();
			var viewDataDinctionary = new ViewDataDictionary();
			viewDataDinctionary.Add("sample", TestHelper.CreateXmlSiteMap());

			viewDataContainer.SetupGet(container => container.ViewData).Returns(viewDataDinctionary);

			// needed for testing serialization
			Mock<ClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<ClientSideObjectWriterFactory>();

            UrlGenerator urlGeneratorObject = new UrlGenerator();
			Mock<INavigationItemAuthorization> authorization = new Mock<INavigationItemAuthorization>();

            TestHelper.RegisterDummyRoutes();

            ViewContext viewContext = TestHelper.CreateViewContext();
            viewContext.ViewData = viewDataDinctionary;

			authorization.Setup(a => a.IsAccessibleToUser(viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(true);

            Menu menu = new Menu(viewContext, clientSideObjectWriterFactory.Object, urlGeneratorObject, authorization.Object, menuRendererFactory.Object);

			renderer = renderer ?? new MenuHtmlBuilder(menu, new Mock<IActionMethodCache>().Object);
			menuRendererFactory.Setup(f => f.Create(It.IsAny<Menu>())).Returns(renderer);

			return menu;
		}
    }
}
