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

        public ActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(new NorthwindDataContext().Customers.ToDataSourceResult(request));
        }
    }
}