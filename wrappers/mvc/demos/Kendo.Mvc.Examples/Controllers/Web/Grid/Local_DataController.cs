using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {        
        public ActionResult Local_Data()
        {
            var model = productService.Read();

            return View(model);
        }        
    }
}