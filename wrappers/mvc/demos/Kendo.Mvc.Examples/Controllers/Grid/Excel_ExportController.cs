using System.Collections.Generic;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult Excel_Export()
        {
            return View();
        }

        public ActionResult Excel_Export_Read([DataSourceRequest]DataSourceRequest request)
        {
            return Json(productService.Read().ToDataSourceResult(request));
        }
    }
}
