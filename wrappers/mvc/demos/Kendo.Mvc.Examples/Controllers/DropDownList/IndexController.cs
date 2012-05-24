namespace Kendo.Mvc.Examples.Controllers
{
    using Kendo.Mvc.Examples.Models;
    using System.Web.Mvc;

    public partial class DropDownListController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetListItems()
        {
            return Json(new NorthwindDataContext().Products);
        }
    }
}