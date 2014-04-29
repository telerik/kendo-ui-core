using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MenuController : Controller
    {
        public ActionResult Direction(int? direction)
        {
            direction = direction ?? 0;

            return View((MenuDirection)direction);
        }
    }
}
