namespace Kendo.Mvc.UI.Tests
{
    using System.Web.Mvc;
    using Kendo.Mvc;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;

    public class TooltipTestHelper
    {
        static public Tooltip CreateTooltip()
        {
            ViewContext viewContext = TestHelper.CreateViewContext();
            return new Tooltip(viewContext, new JavaScriptInitializer(), new ViewDataDictionary());
        }
    }
}