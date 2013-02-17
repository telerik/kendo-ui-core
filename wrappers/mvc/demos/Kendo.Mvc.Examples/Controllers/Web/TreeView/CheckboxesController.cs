using System.Web.Mvc;
using System.Web.Routing;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class TreeViewController : Controller
    {
        public ActionResult Checkboxes()
        {
            return View(new string[0]);
        }

        [HttpPost]
        public ActionResult Checkboxes(string[] checkedNodes)
        {
            checkedNodes = checkedNodes ?? new string[0];
            return View(checkedNodes);
        }
    }
}