namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;


    public class CalendarHtmlBuilderFactoryTests
    {
        [Fact]
        public void Should_be_able_to_create_renderer()
        {
            CalendarHtmlBuilderFactory factory = new CalendarHtmlBuilderFactory();

            ICalendarHtmlBuilder renderer = factory.Create(CalendarTestHelper.CreateCalendar(null));

            Assert.IsType<CalendarHtmlBuilder>(renderer);
        }
    }
}
