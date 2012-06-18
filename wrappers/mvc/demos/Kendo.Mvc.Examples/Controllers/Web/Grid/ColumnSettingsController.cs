using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController
    {
        public ActionResult ColumnSettings()
        {
            var columns = new[] 
            {
                new GridColumnSettings
                {
                    Member = "ProductName",
                    Width = "200px"
                },
                new GridColumnSettings
                {
                    Member = "UnitPrice",
                    Width = "130px",
                    Format = "{0:c}",
                },
                new GridColumnSettings
                {
                    Member = "UnitsInStock",
                    Width = "130px"
                },
                new GridColumnSettings
                {
                    Member = "LastSupply",
                    Width = "130px",
                    Format = "{0:d}"
                },
                new GridColumnSettings
                {
                    Member = "Discontinued"
                },
                new GridCommandColumnSettings
                {
                    Commands = 
                    {
                        new GridEditActionCommand(),
                        new GridDestroyActionCommand()
                    },
                    Width = "200px",
                    Title = "Commands"
                }
            };
            ViewData["Columns"] = columns;

            return View();
        }

        public ActionResult ColumnSettings_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(SessionProductRepository.All().ToDataSourceResult(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ColumnSettings_Update([DataSourceRequest] DataSourceRequest request, ProductViewModel product)
        {
            if (product != null && ModelState.IsValid)
            {                
                var target = SessionProductRepository.One(p => p.ProductID == product.ProductID);
                if (target != null)
                {
                    target.ProductName = product.ProductName;
                    target.UnitPrice = product.UnitPrice;
                    target.UnitsInStock = product.UnitsInStock;
                    target.LastSupply = product.LastSupply;
                    target.Discontinued = product.Discontinued;
                    SessionProductRepository.Update(target);
                }             
            }            

            return Json(ModelState.ToDataSourceResult());
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ColumnSettings_Destroy([DataSourceRequest] DataSourceRequest request, ProductViewModel product)
        {            
            if (product != null)
            {                
                SessionProductRepository.Delete(product);                
            }

            return Json(ModelState.ToDataSourceResult());
        }
    }
}
