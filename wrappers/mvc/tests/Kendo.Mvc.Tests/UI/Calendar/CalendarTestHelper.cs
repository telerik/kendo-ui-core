namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;


    using Kendo.Mvc.Infrastructure;
    using Moq;

    public static class CalendarTestHelper
    {
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;

        public static Calendar CreateCalendar(ICalendarHtmlBuilder renderer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            Mock<ICalendarHtmlBuilderFactory> calendarHtmlBuilderFactory = new Mock<ICalendarHtmlBuilderFactory>();

            Mock<IUrlGenerator> urlGenerator = new Mock<IUrlGenerator>();

            ViewContext viewContext = TestHelper.CreateViewContext();


            var initializer = new Mock<IJavaScriptInitializer>();

            Calendar calendar = new Calendar(viewContext, initializer.Object, urlGenerator.Object, calendarHtmlBuilderFactory.Object);

            renderer = renderer ?? new CalendarHtmlBuilder(calendar);
            calendarHtmlBuilderFactory.Setup(f => f.Create(It.IsAny<Calendar>())).Returns(renderer);

            return calendar;
        }
    }
}