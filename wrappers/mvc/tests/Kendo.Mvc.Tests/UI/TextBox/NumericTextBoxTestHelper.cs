using Kendo.Mvc.UI;
using Moq;
using System.IO;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace Kendo.Mvc.UI.Tests
{
    public static class NumericTextBoxTestHelper
    {
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;

        public static NumericTextBox<T> CreateInput<T>() where T : struct
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();

            ViewContext viewContext = TestHelper.CreateViewContext();

            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter.Object);

            NumericTextBox<T> input = new NumericTextBox<T>(viewContext, clientSideObjectWriterFactory.Object, new ViewDataDictionary());

            return input;
        }
    }
}
