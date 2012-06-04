namespace Kendo.Mvc.Examples.Controllers
{
    using Kendo.Mvc.Examples.Models;
    using System.Linq;
    using System.Web.Mvc;

    public partial class ComboBoxController : Controller
    {
        public ActionResult CascadingComboBox()
        {
            return View();
        }

        public JsonResult GetCascadeCategories()
        {
            var northwind = new NorthwindDataContext();

            return Json(northwind.Categories.Select(c => new { CategoryId = c.CategoryID, CategoryName = c.CategoryName }), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCascadeProducts(string categories)
        {
            var northwind = new NorthwindDataContext();
            var products = northwind.Products.AsQueryable();

            if (!string.IsNullOrEmpty(categories))
            {
                products = products.Where(p => p.CategoryID.ToString() == categories);
            }

            return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName}), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCascadeOrders(string products)
        {
            var northwind = new NorthwindDataContext();
            var orders = northwind.Order_Details.AsQueryable();

            if (!string.IsNullOrEmpty(products))
            {
                orders = orders.Where(o => o.ProductID.ToString() == products);
            }

            return Json(orders.Select(o => new { OrderID = o.OrderID, ShipCity = o.Order.ShipCity }), JsonRequestBehavior.AllowGet);
        }
    }
}