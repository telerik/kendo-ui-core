namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;
    using Moq;

    public static class DatePickerTestHelper
    {
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;

        public static DatePicker CreateDatePicker(DatePickerHtmlBuilder renderer, ViewContext viewContext)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));
            
            viewContext = viewContext ?? TestHelper.CreateViewContext();

            var initializer = new Mock<IJavaScriptInitializer>();

            DatePicker datepicker = new DatePicker(viewContext, initializer.Object, new ViewDataDictionary());

            return datepicker;
        }
    }
}