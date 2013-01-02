using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public static class CustomerRepository
    {
        public static IList<CustomerModel> All()
        {
            IList<CustomerModel> result = HttpContext.Current.Session["Customers"] as IList<CustomerModel>;

            if (result == null)
            {
                HttpContext.Current.Session["Customers"] = result = new NorthwindDataContext().Customers.Select(c => new CustomerModel
                {
                    CustomerID = c.CustomerID,
                    ContactName = c.ContactName,
                    CompanyName = c.CompanyName,
                }).ToList();
            }

            return result;
        }
    }
}