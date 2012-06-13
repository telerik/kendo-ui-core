using System.Web.Mvc;
using System.Linq;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult ServerRowTemplate()
        {
            return View(new NorthwindDataContext().Customers);
        }
    }
}
