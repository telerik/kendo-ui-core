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

        public JsonResult GetCascadeProducts(string categories, string productFilter)
        {
            var northwind = new NorthwindDataContext();
            var products = northwind.Products.AsQueryable();

            if (!string.IsNullOrEmpty(categories))
            {
                products = products.Where(p => p.CategoryID.ToString() == categories);
            }

            if (!string.IsNullOrEmpty(productFilter))
            {
                products = products.Where(p => p.ProductName.Contains(productFilter));
            }

            return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName }), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCascadeOrders(string products, string orderFilter)
        {
            var northwind = new NorthwindDataContext();
            var orders = northwind.Order_Details.AsQueryable();

            if (!string.IsNullOrEmpty(products))
            {
                orders = orders.Where(o => o.ProductID.ToString() == products);
            }

            if (!string.IsNullOrEmpty(orderFilter))
            {
                orders = orders.Where(o => o.Order.ShipCity.Contains(orderFilter));
            }

            return Json(orders.Select(o => new { OrderID = o.OrderID, ShipCity = o.Order.ShipCity }), JsonRequestBehavior.AllowGet);
        }
    }
}