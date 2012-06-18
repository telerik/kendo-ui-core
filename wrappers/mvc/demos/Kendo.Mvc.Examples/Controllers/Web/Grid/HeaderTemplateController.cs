using System.Web.Mvc;
using System.Linq;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {   
        public ActionResult HeaderTemplate(int[] selectedProducts)
        {
            var products = GetProducts();
            selectedProducts = selectedProducts ?? new int[0];

            return View(new HeaderTemplateViewModel
            {
                Products = products,
                SelectedProducts = products.Where(p => selectedProducts.Contains(p.ProductID))
            });
        }     
    }
}