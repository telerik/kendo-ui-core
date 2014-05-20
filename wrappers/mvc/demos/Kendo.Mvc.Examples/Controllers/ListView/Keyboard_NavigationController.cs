using Kendo.Mvc.Examples.Models;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ListViewController : Controller
    {
        public ActionResult Keyboard_Navigation()
        {
            return View(productService.Read());
        }
    }
}