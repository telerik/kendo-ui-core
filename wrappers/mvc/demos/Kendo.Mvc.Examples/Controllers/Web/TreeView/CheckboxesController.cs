using System.Web.Mvc;
using System.Web.Routing;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class TreeViewController : Controller
    {
        public ActionResult Checkboxes()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Checkboxes(int[] checkedNodes)
        {
            return View(checkedNodes);
        }
    }
}