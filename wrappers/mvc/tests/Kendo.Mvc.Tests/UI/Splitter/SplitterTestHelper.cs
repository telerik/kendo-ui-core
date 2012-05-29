namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Moq;

    public static class SplitterTestHelper
    {
        public static ViewContext viewContext;

        public static Splitter CreateSplitter()
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            viewContext = TestHelper.CreateViewContext();


            var initializer = new Mock<IJavaScriptInitializer>();
            
            var splitter = new Splitter(viewContext, initializer.Object);

            return splitter;
        }
    }
}