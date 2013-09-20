namespace Kendo.Mvc.Examples.Controllers
{
    using Kendo.Mvc.Examples.Models;
    using System.Linq;
    using System.Web.Mvc;

    public partial class DropDownListController : Controller
    {
        public ActionResult CascadingDropDownList()
        {
            return View();
        }

        public JsonResult GetCascadeCategories()
        {
            var northwind = new SampleEntities();

            return Json(northwind.Categories.Select(c => new { CategoryId = c.CategoryID, CategoryName = c.CategoryName }), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCascadeProducts(int? categories)
        {
            var northwind = new SampleEntities();
            var products = northwind.Products.AsQueryable();

            if (categories != null)
            {
                products = products.Where(p => p.CategoryID == categories);
            }

            return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName}), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCascadeOrders(int? products)
        {
            var northwind = new SampleEntities();
            var orders = northwind.Order_Details.AsQueryable();

            if (products != null)
            {
                orders = orders.Where(o => o.ProductID == products);
            }

            return Json(orders.Select(o => new { OrderID = o.OrderID, ShipCity = o.Order.ShipCity }), JsonRequestBehavior.AllowGet);
        }
    }
}