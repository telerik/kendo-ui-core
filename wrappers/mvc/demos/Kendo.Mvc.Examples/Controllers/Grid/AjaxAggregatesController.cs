using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult AjaxAggregates()
        {
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ActionResult AjaxAggregates_Read([DataSourceRequest] DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products;

            return Json(products.ToDataSource(request));
        }
    }
}
