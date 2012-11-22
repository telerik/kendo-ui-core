using Kendo.Mvc.Examples.Models;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ListViewController : Controller
    {
        public ActionResult Navigation()
        {
            return View(SessionProductRepository.All());
        }
    }
}