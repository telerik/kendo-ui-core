using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MenuController : Controller
    {
        public ActionResult Orientation(string orientation)
        {
            MenuOrientation value = MenuOrientation.Horizontal;

            if (orientation == "Vertical")
            {
                value = MenuOrientation.Vertical;
            }

            return View(value);
        }
    }
}
