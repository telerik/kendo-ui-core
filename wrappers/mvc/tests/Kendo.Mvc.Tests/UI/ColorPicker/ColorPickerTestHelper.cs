namespace Kendo.Mvc.UI.Tests
{
    using System.Web.Mvc;
    using Kendo.Mvc;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;

    public class ColorPickerTestHelper
    {
        static public ColorPicker CreateColorPicker()
        {
            ViewContext viewContext = TestHelper.CreateViewContext();
            return new ColorPicker(viewContext, new JavaScriptInitializer(), new ViewDataDictionary());
        }
    }
}