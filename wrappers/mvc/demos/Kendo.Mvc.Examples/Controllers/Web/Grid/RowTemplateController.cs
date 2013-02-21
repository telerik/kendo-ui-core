using System.Web.Mvc;
using Kendo.Mvc.UI;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult RowTemplate()
        {
            return View();
        }

        public ActionResult RowTemplate_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetEmployees().ToDataSourceResult(request));
        }
    }
}