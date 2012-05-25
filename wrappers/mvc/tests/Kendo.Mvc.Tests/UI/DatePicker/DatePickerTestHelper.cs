namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.Infrastructure;
    using Moq;
    using System.Web.Mvc;

    public static class DatePickerTestHelper
    {
        public static DatePicker CreateDatePicker(ViewContext viewContext)
        {
            viewContext = viewContext ?? TestHelper.CreateViewContext();

            var initializer = new Mock<IJavaScriptInitializer>();

            DatePicker datepicker = new DatePicker(viewContext, initializer.Object, new ViewDataDictionary());

            return datepicker;
        }
    }
}