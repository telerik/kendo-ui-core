using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using System.Collections.Generic;
using System.Data.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult Index()
        {
            return View(GetProductDto());
        }

        public ActionResult LocalData()
        {
            return View(GetProductDto());
        }

        public ActionResult ServerHierarchy()
        {
            return View(new NorthwindDataContext().Employees);
        }

        public ActionResult ServerDetails()
        {
            return View(new NorthwindDataContext().Employees);
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
                ShipAddress = order.ShipAddress
            });
        }

        private static IEnumerable<ProductDto> GetProductDto()
        {
            var northwind = new NorthwindDataContext();

            return northwind.Products.Select(product => new ProductDto
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitPrice = product.UnitPrice ?? 0,
                UnitsInStock = product.UnitsInStock ?? 0,
                UnitsOnOrder = product.UnitsOnOrder ?? 0,
                Discontinued = product.Discontinued
            });
        }
    }
}