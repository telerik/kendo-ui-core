using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers.Grid
{
    public partial class GridController : Controller
    {
        public ActionResult Index()
        {
            return View(new NorthwindDataContext().Products);
        }
    }
}