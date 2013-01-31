using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult Toolbar_Template()
        {
            return View();
        }

        public ActionResult ToolbarTemplate_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(SessionClientProductRepository.All().ToDataSourceResult(request));
        }

        public ActionResult ToolbarTemplate_Categories()
        {
     
            var dataContext = new NorthwindDataContext();
            var categories = dataContext.Categories
                        .Select(c => new ClientCategoryViewModel {
                            CategoryID = c.CategoryID,
                            CategoryName = c.CategoryName
                        })
                        .OrderBy(e => e.CategoryName);

            return Json(categories, JsonRequestBehavior.AllowGet);
        }
    }
}
