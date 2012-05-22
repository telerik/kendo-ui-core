namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;

    using Moq;
    using Kendo.Mvc.UI.Html;

    public static class DateTimePickerTestHelper
    {
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;

        public static DateTimePicker CreateDateTimePicker(DateTimePickerHtmlBuilder renderer, ViewContext viewContext)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));
            
            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();

            viewContext = viewContext ?? TestHelper.CreateViewContext();

            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter.Object);

            DateTimePicker dateTimePicker = new DateTimePicker(viewContext, clientSideObjectWriterFactory.Object, new ViewDataDictionary());

            renderer = renderer ?? new DateTimePickerHtmlBuilder(dateTimePicker);

            return dateTimePicker;
        }
    }
}