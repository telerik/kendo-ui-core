using Kendo.Mvc.Examples.Models;
using System.Web.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MenuController : Controller
    {
        public ActionResult ModelBinding()
        {
            SampleEntities northwind = new SampleEntities();
            return View(northwind.Categories);
        }
    }
}
