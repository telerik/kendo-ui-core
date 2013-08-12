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
        public ActionResult Checkboxes(string[] checkedFiles)
        {
            checkedFiles = checkedFiles ?? new string[0];
            return View(checkedFiles);
        }
    }
}