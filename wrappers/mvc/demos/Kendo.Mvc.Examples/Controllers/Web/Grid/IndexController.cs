﻿using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult Index()
        {
            return View(GetProducts());
        }

        public ActionResult Remote_Data()
        {
            return View("AjaxBinding");
        }

        public ActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetProducts().ToDataSourceResult(request));
        }

        private static IEnumerable<OrderViewModel> GetOrders()
        {
            var northwind = new NorthwindDataContext();

            var loadOptions = new DataLoadOptions();

            loadOptions.LoadWith<Order>(o => o.Customer);
            northwind.LoadOptions = loadOptions;

            return northwind.Orders.Select(order => new OrderViewModel
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
                Discontinued = product.Discontinued,
                LastSupply = DateTime.Today
            });
        }

        private static IEnumerable<EmployeeViewModel> GetEmployees()
        {
            var northwind = new NorthwindDataContext();

            return northwind.Employees.Select(employee => new EmployeeViewModel
            {
                EmployeeID = employee.EmployeeID,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Country = employee.Country,
                City = employee.City,
                Notes = employee.Notes,
                Title = employee.Title,
                Address = employee.Address,
                HomePhone = employee.HomePhone
            });
        }
    }
}