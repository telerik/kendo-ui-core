using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {        
        public ActionResult ServerDetails()
        {
            return View(new NorthwindDataContext().Employees);
        }
    }
}