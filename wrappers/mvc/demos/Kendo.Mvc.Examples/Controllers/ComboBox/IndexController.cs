namespace Kendo.Mvc.Examples.Controllers
{
    using Kendo.Mvc.Examples.Models;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;
    using System.Data;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Query.Dynamic;

    public partial class ComboBoxController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetListItems([DataSourceRequest] DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products.AsQueryable();

            if (request.Filters.Any())
            {
                var filter = request.Filters[0] as FilterDescriptor;

                var result = products.Where(p => p.ProductName.StartsWith(filter.Value.ToString()))
                                     .Select(p => new { 
                                         ProductID = p.ProductID,
                                         ProductName = p.ProductName 
                                     });

                return Json(result, JsonRequestBehavior.AllowGet);
            }

            return Json(products, JsonRequestBehavior.AllowGet);
        }
    }
}