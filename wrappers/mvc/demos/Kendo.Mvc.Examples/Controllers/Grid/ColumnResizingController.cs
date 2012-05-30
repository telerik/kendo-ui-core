using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult ColumnResizing()
        {
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ActionResult ColumnResizing_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetProductDto().ToDataSourceResult(request));
        }
    }
}
