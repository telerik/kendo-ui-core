namespace Kendo.Mvc.Examples.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public static class SessionClientOrderRepository
    {
        public static IEnumerable<ClientOrderViewModel> All()
        {
            IEnumerable<ClientOrderViewModel> result = HttpContext.Current.Session["orders"] as IEnumerable<ClientOrderViewModel>;

            if (result == null)
            {
                HttpContext.Current.Session["orders"] = result = new NorthwindDataContext().Orders
                    .Select(o => new ClientOrderViewModel
                    {
                        OrderID = o.OrderID,
                        OrderDate = o.OrderDate ?? DateTime.Now,
                        ShipAddress = o.ShipAddress,
                        ShipCountry = o.ShipCountry,
                        ShipName = o.ShipName,
                        ContactName = o.Customer.CompanyName,
                        EmployeeID = o.EmployeeID ?? 0,
                        Employee = new ClientEmployeeViewModel { 
                            EmployeeName = o.Employee.FirstName + " " + o.Employee.LastName,
                            EmployeeID = o.EmployeeID ?? 0
                        }
                    }).ToList();
            }

            return result;
        }

        public static ClientOrderViewModel One(Func<ClientOrderViewModel, bool> predicate)
        {
            return All().Where(predicate).FirstOrDefault();
        }

        public static void Update(ClientOrderViewModel order)
        {
            ClientOrderViewModel editable = One(o => o.OrderID == order.OrderID);

            if (editable != null)
            {
                editable.OrderDate = order.OrderDate;                
                editable.ShipAddress = order.ShipAddress;
                editable.ShipCountry = order.ShipCountry;
                editable.ShipName = order.ShipName;
                editable.ContactName = order.ContactName;                
                editable.Employee = order.Employee;
                editable.EmployeeID = order.EmployeeID;
            }
        }
    }
}