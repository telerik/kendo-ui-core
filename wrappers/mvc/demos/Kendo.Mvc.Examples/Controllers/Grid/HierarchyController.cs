using System.Web.Mvc;
using System.Linq;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult Hierarchy()
        {
            return View();
        }

        public ActionResult HierarchyBinding_Employees([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetEmployees().ToDataSourceResult(request));
        }

        public ActionResult HierarchyBinding_Orders(int employeeID, [DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetOrders()
                .Where(order => order.EmployeeID == employeeID)
                .ToDataSourceResult(request));
        }
    }
}