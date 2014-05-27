using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class SortableController : Controller
    {
        public ActionResult Integration_Grid()
        {
            var model = productService.Read();

            return View(model);
        }
    }
}