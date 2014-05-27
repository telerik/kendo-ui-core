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
            return Json(productService.Read().ToDataSourceResult(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditingCustom_Update([DataSourceRequest] DataSourceRequest request, 
            [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
        {
            if (products != null && ModelState.IsValid)
            {
                foreach (var product in products)
                {
                    productService.Update(product);
                }
            }

            return Json(products.ToDataSourceResult(request,ModelState));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditingCustom_Create([DataSourceRequest] DataSourceRequest request, 
            [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
        {
            var results = new List<ProductViewModel>();

            if (products != null && ModelState.IsValid)
            {
                foreach (var product in products)
                {
                    productService.Create(product);

                    results.Add(product);
                }
            }

            return Json(results.ToDataSourceResult(request, ModelState));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditingCustom_Destroy([DataSourceRequest] DataSourceRequest request,
            [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
        {
            foreach (var product in products)
            {
                productService.Destroy(product);
            }

            return Json(products.ToDataSourceResult(request, ModelState));
        }
  

        private void PopulateCategories()
        {
            var dataContext = new SampleEntities();
            var categories = dataContext.Categories
                        .Select(c => new CategoryViewModel {
                            CategoryID = c.CategoryID,
                            CategoryName = c.CategoryName
                        })
                        .OrderBy(e => e.CategoryName);

            ViewData["categories"] = categories;
            ViewData["defaultCategory"] = categories.First();            
        }

        private void PopulateEmployees()
        {
            ViewData["employees"] = new SampleEntities().Employees
                        .Select(e => new EmployeeViewModel
                        {
                            EmployeeID = e.EmployeeID,
                            EmployeeName = e.FirstName + " " + e.LastName
                        })
                        .OrderBy(e => e.EmployeeName);
        }
    }
}
