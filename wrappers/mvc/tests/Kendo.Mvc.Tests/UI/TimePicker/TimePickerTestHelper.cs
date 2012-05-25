namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.Infrastructure;
    using Moq;
    using System.Web.Mvc;
    
    public static class TimePickerTestHelper
    {
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;
        public static ViewContext viewContext;

        public static TimePicker CreateTimePicker()
        {
            var initializer = new Mock<IJavaScriptInitializer>();

            viewContext = TestHelper.CreateViewContext();

            TimePicker timepicker = new TimePicker(viewContext, initializer.Object, new ViewDataDictionary());

            return timepicker;
        }
    }
}