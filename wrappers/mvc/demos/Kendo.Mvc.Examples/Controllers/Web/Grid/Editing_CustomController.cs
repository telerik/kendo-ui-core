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
            PopulateCategories();
            return View();
        }

        public ActionResult EditingCustom_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(SessionClientProductRepository.All().ToDataSourceResult(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditingCustom_Update([DataSourceRequest] DataSourceRequest request, 
            [Bind(Prefix = "models")]IEnumerable<ClientProductViewModel> products)
        {
            if (products != null && ModelState.IsValid)
            {
                foreach (var product in products)
                {
                    SessionClientProductRepository.Update(product);
                }
            }

            return Json(ModelState.ToDataSourceResult());
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditingCustom_Create([DataSourceRequest] DataSourceRequest request, 
            [Bind(Prefix = "models")]IEnumerable<ClientProductViewModel> products)
        {
            var results = new List<ClientProductViewModel>();

            if (products != null && ModelState.IsValid)
            {
                foreach (var product in products)
                {
                    SessionClientProductRepository.Insert(product);
                    results.Add(product);
                }
            }

            return Json(results.ToDataSourceResult(request, ModelState));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditingCustom_Destroy([DataSourceRequest] DataSourceRequest request,
            [Bind(Prefix = "models")]IEnumerable<ClientProductViewModel> products)
        {
            if (products.Any())
            {
                foreach (var product in products)
                {
                    SessionClientProductRepository.Delete(product);
                }
            }

            return Json(ModelState.ToDataSourceResult());
        }
  

        private void PopulateCategories()
        {
            var dataContext = new NorthwindDataContext();
            var categories = dataContext.Categories
                        .Select(c => new ClientCategoryViewModel {
                            CategoryID = c.CategoryID,
                            CategoryName = c.CategoryName
                        })
                        .OrderBy(e => e.CategoryName);
            ViewData["categories"] = categories;
            ViewData["defaultCategory"] = categories.First();            
        }

        private void PopulateEmployees()
        {
            ViewData["employees"] = new NorthwindDataContext().Employees
                        .Select(e => new ClientEmployeeViewModel
                        {
                            EmployeeID = e.EmployeeID,
                            EmployeeName = e.FirstName + " " + e.LastName
                        })
                        .OrderBy(e => e.EmployeeName);
        }
    }
}
