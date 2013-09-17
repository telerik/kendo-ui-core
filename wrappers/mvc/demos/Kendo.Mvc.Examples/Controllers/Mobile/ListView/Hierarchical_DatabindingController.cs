using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers.Mobile
{
    public partial class ListViewController : Controller
    {       
        public ActionResult Hierarchical_Databinding()
        {
            return View();
        }

        public JsonResult Employees(int? EmployeeId)
        {
            var dataContext = new SampleEntities();

            var employees = from e in dataContext.Employees
                            where (EmployeeId.HasValue ? e.ReportsTo == EmployeeId : e.ReportsTo == null)
                            select new
                            {
                                EmployeeId = e.EmployeeID,
                                FullName = e.FirstName + " " + e.LastName,
                                HasEmployees = e.Employees1.Any()
                            };

            return Json(employees, JsonRequestBehavior.AllowGet);
        }
    }
}
