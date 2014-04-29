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
        public ActionResult DataBinding()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GroupedData([DataSourceRequest] DataSourceRequest request)
        {
            var products = new[] {
                new { Name = "Sashimi salad", Letter = "S" },
                new { Name = "Chirashi sushi", Letter = "C" },
                new { Name = "Seaweed salad", Letter = "S" },
                new { Name = "Edamame", Letter = "E" },
                new { Name = "Miso soup", Letter = "M" },
                new { Name = "Maguro", Letter = "M" },
                new { Name = "Shake", Letter = "S" },
                new { Name = "Shiromi", Letter = "S" },
                new { Name = "Tekka maki", Letter = "T" },
                new { Name = "Hosomaki Mix", Letter = "H" },
                new { Name = "California rolls", Letter = "C" },
                new { Name = "Seattle rolls", Letter = "S" },
                new { Name = "Spicy Tuna rolls", Letter = "S" },
                new { Name = "Ebi rolls", Letter = "E" },
                new { Name = "Chicken Teriyaki", Letter = "C" },
                new { Name = "Salmon Teriyaki", Letter = "S" },
                new { Name = "Gohan", Letter = "G" },
                new { Name = "Tori Katsu", Letter = "T" },
                new { Name = "Yaki Udon", Letter = "Y" }
            };

            return Json(products.ToDataSourceResult(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult FlatData([DataSourceRequest] DataSourceRequest request)
        {
            var products = new[] {
                "Sashimi salad", 
                "Chirashi sushi", 
                "Seaweed salad", 
                "Edamame", 
                "Miso soup", 
                "Maguro", 
                "Shake", 
                "Shiromi", 
                "Tekka maki", 
                "Hosomaki Mix", 
                "California rolls", 
                "Seattle rolls", 
                "Spicy Tuna rolls", 
                "Ebi rolls", 
                "Chicken Teriyaki", 
                "Salmon Teriyaki", 
                "Gohan", 
                "Tori Katsu", 
                "Yaki Udon"
            };

            return Json(products.ToDataSourceResult(request));
        }
    }
}
