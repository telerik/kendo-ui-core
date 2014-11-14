﻿using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Examples.Models.TreeList;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using System.Linq.Expressions;
using System;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class EmployeeDirectoryController : Controller
    {
        private EmployeeDirectoryService employeeDirectory;

        public EmployeeDirectoryController()
        {
            employeeDirectory = new EmployeeDirectoryService(new SampleEntities());
        }

        public JsonResult Index([DataSourceRequest] DataSourceRequest request, int? id)
        {
            var result = GetDirectory().ToTreeDataSourceResult(request,
                e => e.EmployeeID,
                e => e.ReportsTo,
                e => id.HasValue ? e.ReportsTo == id : e.ReportsTo == null,
                e => e.ToEmployeeDirectoryModel()
            );

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult All([DataSourceRequest] DataSourceRequest request)
        {
            var result = GetDirectory().ToTreeDataSourceResult(request,
                e => e.EmployeeID,
                e => e.ReportsTo,
                e => e.ToEmployeeDirectoryModel(request)
            );
            
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Destroy([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            if (ModelState.IsValid)
            {
                employeeDirectory.Delete(employee, ModelState);
            }

            return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

        public JsonResult Create([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            if (ModelState.IsValid)
            {
                employeeDirectory.Insert(employee, ModelState);
            }

            return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

        public JsonResult Update([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            if (ModelState.IsValid)
            {
                employeeDirectory.Update(employee, ModelState);
            }

            return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

        private IEnumerable<EmployeeDirectory> GetDirectory()
        {
            return employeeDirectory.GetAll();
        }       

        protected override void Dispose(bool disposing)
        {
            employeeDirectory.Dispose();

            base.Dispose(disposing);
        }
    }
}