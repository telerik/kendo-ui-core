namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;
    using Moq;
    using System.Web.Mvc;

    public static class DateTimePickerTestHelper
    {
        public static DateTimePicker CreateDateTimePicker(ViewContext viewContext)
        {
            var initializer = new Mock<IJavaScriptInitializer>();

            DateTimePicker dateTimePicker = new DateTimePicker(viewContext, initializer.Object, new ViewDataDictionary());

            return dateTimePicker;
        }
    }
}