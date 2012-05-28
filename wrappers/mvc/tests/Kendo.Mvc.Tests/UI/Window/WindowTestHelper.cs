namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Moq;
    using Kendo.Mvc.Infrastructure;

    public static class WindowTestHelper
    {   
        public static Window CreateWindow(WindowHtmlBuilder renderer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));
                        
            var javaScriptInitializer = new Mock<IJavaScriptInitializer>();

            Mock<IUrlGenerator> urlGenerator = new Mock<IUrlGenerator>();

            ViewContext viewContext = TestHelper.CreateViewContext();            

            Window window = new Window(viewContext, javaScriptInitializer.Object);

            renderer = renderer ?? new WindowHtmlBuilder(window);

            return window;
        }
    }
}