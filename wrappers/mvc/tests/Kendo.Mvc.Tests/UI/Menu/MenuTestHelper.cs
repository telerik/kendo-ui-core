namespace Kendo.Mvc.UI
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
            
            UrlGenerator urlGeneratorObject = new UrlGenerator();
			Mock<INavigationItemAuthorization> authorization = new Mock<INavigationItemAuthorization>();

            TestHelper.RegisterDummyRoutes();

            ViewContext viewContext = TestHelper.CreateViewContext();

            var viewDataDinctionary = new ViewDataDictionary();
            viewDataDinctionary.Add("sample", TestHelper.CreateXmlSiteMap());
            viewContext.ViewData = viewDataDinctionary;

			authorization.Setup(a => a.IsAccessibleToUser(viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(true);

            var initializer = new Mock<IJavaScriptInitializer>();

            Menu menu = new Menu(viewContext, initializer.Object, urlGeneratorObject, authorization.Object);

			return menu;
		}
    }
}
