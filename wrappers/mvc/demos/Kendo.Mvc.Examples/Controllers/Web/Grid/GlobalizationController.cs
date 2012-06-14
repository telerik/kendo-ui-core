using System.Web.Mvc;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;
using System.Threading;
using System.Globalization;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController
    {
        public ActionResult Globalization(string culture)
        {
            ViewData["culture"] = culture = culture ?? "bg-BG";
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture = new CultureInfo(culture);
            return View(GetProducts());
        }

        public ActionResult Globalization_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetProducts().ToDataSourceResult(request));
        }
    }
}
