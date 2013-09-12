using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers.Mobile
{
    public partial class ListViewController : Controller
    {       
        public ActionResult Endless_Scrolling()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Scroll_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(productService.Read().OrderByDescending(product => product.ProductID).ToDataSourceResult(request));
        }
    }
}
