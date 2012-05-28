using Kendo.Mvc.UI;
using Moq;
using System.IO;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI.Tests
{
    public static class NumericTextBoxTestHelper
    {
        public static Mock<IJavaScriptInitializer> clientSideObjectWriter;

        public static NumericTextBox<T> CreateInput<T>() where T : struct
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            Mock<IJavaScriptInitializer> intializer = new Mock<IJavaScriptInitializer>();

            ViewContext viewContext = TestHelper.CreateViewContext();

            NumericTextBox<T> input = new NumericTextBox<T>(viewContext, intializer.Object, new ViewDataDictionary());

            return input;
        }
    }
}
