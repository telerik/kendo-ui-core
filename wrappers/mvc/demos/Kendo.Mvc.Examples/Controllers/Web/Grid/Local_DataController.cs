using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {        
        public ActionResult Local_Data()
        {
            return View(GetProducts());
        }        
    }
}