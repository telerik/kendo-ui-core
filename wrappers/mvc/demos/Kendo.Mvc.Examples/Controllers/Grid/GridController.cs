using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers.Grid
{
    public class GridController : Controller
    {
        public ActionResult Index([DataSourceRequest] DataSourceRequest request)
        {
            return View(new NorthwindDataContext().Products);
        }
    }
}