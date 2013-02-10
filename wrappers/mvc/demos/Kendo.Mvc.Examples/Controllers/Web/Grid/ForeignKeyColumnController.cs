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
            PopulateCategories();
            return View();
        }

        public ActionResult ForeignKeyColumn_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(SessionClientProductRepository.All().ToDataSourceResult(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ForeignKeyColumn_Update([DataSourceRequest] DataSourceRequest request, 
            [Bind(Prefix = "models")]IEnumerable<ClientProductViewModel> products)
        {
            if (products != null && ModelState.IsValid)
            {
                foreach (var product in products)
                {
                    product.Category = GetCategory(product.CategoryID);
                    SessionClientProductRepository.Update(product);                    
                }
            }

            return Json(ModelState.ToDataSourceResult());
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ForeignKeyColumn_Create([DataSourceRequest] DataSourceRequest request, 
            [Bind(Prefix = "models")]IEnumerable<ClientProductViewModel> products)
        {
            var results = new List<ClientProductViewModel>();
            if (products != null && ModelState.IsValid)
            {
                foreach (var product in products)
                {
                    product.Category = GetCategory(product.CategoryID);
                    SessionClientProductRepository.Insert(product);
                    results.Add(product);
                }
            }

            return Json(results.ToDataSourceResult(request, ModelState));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ForeignKeyColumn_Destroy([DataSourceRequest] DataSourceRequest request,
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

        private ClientCategoryViewModel GetCategory(int categoryID)
        {
            var dataContext = new NorthwindDataContext();
            var category = dataContext.Categories
                        .Where(c=> c.CategoryID == categoryID)
                        .Select(c => new ClientCategoryViewModel
                        {
                            CategoryID = c.CategoryID,
                            CategoryName = c.CategoryName
                        }).FirstOrDefault();
            return category;
        }
    }
}
