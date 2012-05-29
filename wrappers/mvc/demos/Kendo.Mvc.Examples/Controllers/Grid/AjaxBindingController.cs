using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult AjaxBinding()
        {
            return View();
        }

        public ActionResult AjaxBinding_Read([DataSourceRequest] DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products;

            return Json(products.ToDataSourceResult(request));
        }
    }
}
