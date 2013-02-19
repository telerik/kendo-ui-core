using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public static class EmployeeRepository
    {
        public static IList<EmployeeModel> All()
        {
            IList<EmployeeModel> result = HttpContext.Current.Session["Employees"] as IList<EmployeeModel>;

            if (result == null)
            {
                HttpContext.Current.Session["Employees"] = result = new SampleDataContext().Employees.Select(e => new EmployeeModel
                    {
                        EmployeeId = e.EmployeeID,
                        FullName = e.FirstName + " " + e.LastName,
                        ReportsTo = e.ReportsTo,
                        HasEmployees = e.Employees.Count > 0
                    }).ToList();
            }

            return result;
        }
    }
}