using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult ForeignKeyColumn()
        {
            PopulateEmployees();
            return View();
        }

        public ActionResult ForeignKeyColumn_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(SessionClientOrderRepository.All().ToDataSourceResult(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ForeignKeyColumn_Update([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<ClientOrderViewModel> orders)
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
                        target.Employee = new NorthwindDataContext()
                            .Employees
                            .Where(e => e.EmployeeID == order.EmployeeID)
                            .ToList()
                            .Select(e => new ClientEmployeeViewModel
                            {
                                EmployeeName = e.FirstName + " " + e.LastName,
                                EmployeeID = e.EmployeeID
                            }).FirstOrDefault();
                        target.EmployeeID = order.EmployeeID;
                        SessionClientOrderRepository.Update(target);
                    }
                }
            }

            return Json(ModelState.ToDataSourceResult());
        }       
    }
}
