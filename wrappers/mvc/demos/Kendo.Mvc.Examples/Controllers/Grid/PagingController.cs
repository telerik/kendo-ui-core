using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult Paging()
        {
            return View(new PagerViewModel());
        }

        [HttpPost]
        public ActionResult Paging(PagerViewModel pager)
        {
            return View(pager);
        }

        [HttpPost]
        public ActionResult Paging_Orders([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetOrders().ToDataSourceResult(request));
        }
    }
}