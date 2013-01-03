namespace Kendo.Mvc.Examples.Controllers
{
    using System.Web.Mvc;

    public partial class ColorPickerController : Controller
    {
        public ActionResult Index(string colorpicker)
        {
            ViewBag.color = colorpicker;

            return View();
        }
    }
}