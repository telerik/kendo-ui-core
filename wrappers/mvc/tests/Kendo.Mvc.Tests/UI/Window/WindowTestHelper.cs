namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Moq;

    public static class WindowTestHelper
    {
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;

        public static Window CreateWindow(WindowHtmlBuilder renderer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();

            Mock<IUrlGenerator> urlGenerator = new Mock<IUrlGenerator>();

            ViewContext viewContext = TestHelper.CreateViewContext();

            clientSideObjectWriterFactory
                .Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>()))
                    .Returns(clientSideObjectWriter.Object);

            Window window = new Window(viewContext, clientSideObjectWriterFactory.Object);

            renderer = renderer ?? new WindowHtmlBuilder(window);

            return window;
        }
    }
}