﻿using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System;
using Kendo.Mvc.Examples.Models.TreeList;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class TreeListController : Controller
    {
        private EmployeeDirectoryService productService;

        public TreeListController()
        {
            productService = new EmployeeDirectoryService(new SampleEntities());
        }

        protected override void Dispose(bool disposing)
        {
            productService.Dispose();

            base.Dispose(disposing);
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult All([DataSourceRequest]DataSourceRequest request)
        {
            return Json(GetDirectory().ToDataSourceResult(request), JsonRequestBehavior.AllowGet);
        }

        private static IEnumerable<EmployeeDirectoryModel> GetDirectory()
        {
            var northwind = new SampleEntities();
            return northwind.EmployeeDirectory.Select(employee => new EmployeeDirectoryModel
            {
                EmployeeId = employee.EmployeeID,
                ReportsTo = employee.ReportsTo,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Address = employee.Address,
                City = employee.City,
                Country = employee.Country,
                BirthDate = employee.BirthDate,
                HireDate = employee.HireDate,
                Phone = employee.Phone,
                Position = employee.Position,
                Extension = employee.Extension
            });
        }
    }
}