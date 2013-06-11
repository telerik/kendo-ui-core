using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.Examples.Controllers.Mobile
{
    public partial class ListViewController : Controller
    {       
        public ActionResult FixedHeaders()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult FixedHeaders_Read([DataSourceRequest] DataSourceRequest request)
        {
            var products = new [] {
                new { Name = "Sashimi Salad", Description = "Organic greens topped with market fresh sashimi, wasabi soy vinaigrette.", Url = Url.Content("~/content/mobile/listview/sashimi-salad.jpg"), Letter = "S" },
                new { Name = "Seaweed Salad", Description = "A nice seaweed salad.", Url = Url.Content("~/content/mobile/listview/seaweed-salad.jpg"), Letter = "S" },
                new { Name = "Edamame", Description = "Boiled soy beans with salt.", Url = Url.Content("~/content/mobile/listview/edamame.jpg"), Letter = "E" },
                new { Name = "Maguro", Description = "Tuna pieces.", Url = Url.Content("~/content/mobile/listview/maguro.jpg"), Letter = "M" },
                new { Name = "Tekka Maki", Description = "Tuna roll with wasabi.", Url = Url.Content("~/content/mobile/listview/tekka-maki.jpg"), Letter = "T" },
                new { Name = "California Rolls", Description = "Crab sticks, avocado and cucumber.", Url = Url.Content("~/content/mobile/listview/california-rolls.jpg"), Letter = "C" }
            };

            return Json(products.ToDataSourceResult(request));
        }
    }
}
