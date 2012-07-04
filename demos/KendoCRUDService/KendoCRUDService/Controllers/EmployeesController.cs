using System;
using System.Linq;
using System.Web.Mvc;
using KendoCRUDService.Models;
using KendoCRUDService.Common;
using System.Collections.Generic;

namespace KendoCRUDService.Controllers
{
    public class EmployeesController : Controller
    {
        public ActionResult Index(int? EmployeeId)
        {
            IEnumerable<EmployeeModel> result;

            if (EmployeeId == null)
            {
                result = EmployeeRepository.All().Where(e => e.ReportsTo == null);
            }
            else
            {
                result = EmployeeRepository.All().Where(e => e.ReportsTo == Convert.ToInt32(EmployeeId));
            }
            
            return this.Jsonp(result);
        }
    }
}
