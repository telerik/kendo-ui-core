using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult Index()
        {
            return View(GetProducts());
        }

        public ActionResult Local_Data()
        {
            return View(GetProducts());
        }

        public ActionResult ServerHierarchy()
        {
            return View(new NorthwindDataContext().Employees);
        }

        public ActionResult ServerDetails()
        {
            return View(new NorthwindDataContext().Employees);
        }

        public ActionResult Column_Resizing()
        {
            return View();
        }

        public ActionResult Column_Reordering()
        {
            return View();
        }

        public ActionResult AjaxBinding()
        {
            return View();
        }

        public ActionResult Remote_Data()
        {
            return View("AjaxBinding");
        }

        public ActionResult Api()
        {
            return View();
        }

        public ActionResult Selection()
        {
            return View();
        }

        public ActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetProducts().ToDataSourceResult(request));
        }

        private static IEnumerable<OrderDto> GetOrderDto()
        {
            var northwind = new NorthwindDataContext();

            var loadOptions = new DataLoadOptions();

            loadOptions.LoadWith<Order>(o => o.Customer);
            northwind.LoadOptions = loadOptions;

            return northwind.Orders.Select(order => new OrderDto
            {
                ContactName = order.Customer.ContactName,
                OrderDate = order.OrderDate,
                OrderID = order.OrderID,
                ShipAddress = order.ShipAddress,
                ShipCountry = order.ShipCountry,
                ShipName = order.ShipName,
                EmployeeID = order.EmployeeID
            });
        }

        private static IEnumerable<ProductViewModel> GetProducts()
        {
            var northwind = new NorthwindDataContext();

            return northwind.Products.Select(product => new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitPrice = product.UnitPrice ?? 0,
                UnitsInStock = product.UnitsInStock ?? 0,
                UnitsOnOrder = product.UnitsOnOrder ?? 0,
                Discontinued = product.Discontinued
            });
        }

        private static IEnumerable<EmployeeDto> GetEmployeeDto()
        {
            var northwind = new NorthwindDataContext();

            return northwind.Employees.Select(employee => new EmployeeDto
            {
                EmployeeID = employee.EmployeeID,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Country = employee.Country,
                City = employee.City,
                Notes = employee.Notes,
                Title = employee.Title
            });
        }
    }
}