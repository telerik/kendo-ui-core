namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;

    public static class SplitterTestHelper
    {
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;
        public static ViewContext viewContext;

        public static Splitter CreateSplitter()
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();

            viewContext = TestHelper.CreateViewContext();

            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter.Object);

            Splitter splitter = new Splitter(viewContext, clientSideObjectWriterFactory.Object);

            return splitter;
        }
    }
}