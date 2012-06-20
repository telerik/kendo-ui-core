using System.Collections.Generic;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult Editing_Custom()
        {
            PopulateEmployees();
            return View();
        }

        public ActionResult EditingCustom_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(SessionClientOrderRepository.All().ToDataSourceResult(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditingCustom_Update([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<ClientOrderViewModel> orders)
        {
            if (orders != null && ModelState.IsValid)
            {
                foreach (var order in orders)
                {
                    var target = SessionClientOrderRepository.One(o => o.OrderID == order.OrderID);
    
                    if (target != null)
                    {
                        target.OrderDate = order.OrderDate;
                        target.ShipAddress = order.ShipAddress;
                        target.ShipCountry = order.ShipCountry;
                        target.ShipName = order.ShipName;
                        target.ContactName = order.ContactName;
                        target.Employee= order.Employee;                                                
                        SessionClientOrderRepository.Update(target);
                    }
                }
            }

            return Json(ModelState.ToDataSourceResult());
        }

        private void PopulateEmployees()
        {
            ViewData["employees"] = new NorthwindDataContext().Employees
                        .Select(e => new ClientEmployeeViewModel {
                            EmployeeID = e.EmployeeID,
                            EmployeeName = e.FirstName + " " + e.LastName
                        })
                        .OrderBy(e => e.EmployeeName);
        }
    }
}
