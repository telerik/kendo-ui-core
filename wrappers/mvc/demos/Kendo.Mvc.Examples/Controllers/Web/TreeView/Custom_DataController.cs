using System.Web.Mvc;
using System.Linq;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class TreeViewController : Controller
    {
        public ActionResult Custom_Data()
        {
            return View();
        }

        public JsonResult Users(int? id)
        {
            var dataContext = new NorthwindDataContext();

            var employees = from e in dataContext.Employees
                            where (id.HasValue ? e.ReportsTo == id : e.ReportsTo == null)
                            select new {
                                id = e.EmployeeID,
                                Name = e.FirstName + " " + e.LastName,
                                hasChildren = e.Employees.Any(),
                                Username = e.FirstName.ToLower() + e.EmployeeID
                            };

            return Json(employees, JsonRequestBehavior.AllowGet);
        }
    }
}