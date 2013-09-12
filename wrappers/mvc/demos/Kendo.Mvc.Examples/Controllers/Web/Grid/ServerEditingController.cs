using Kendo.Mvc.Examples.Models;
using System.Web.Mvc;
using System.Web.Routing;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult ServerEditing()
        {
            return View(productService.Read());
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create(ProductViewModel product)
        {   
            if (ModelState.IsValid)
            {
                //The model is valid - insert the product and redisplay the grid.
                productService.Create(product);

                //GridRouteValues() is an extension method which returns the 
                //route values defining the grid state - current page, sort expression, filter etc.
                RouteValueDictionary routeValues = this.GridRouteValues();

                return RedirectToAction("ServerEditing", routeValues);
            }

            //The model is invalid - render the current view to show any validation errors
            return View("ServerEditing", productService.Read());
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Update(ProductViewModel product)
        {   
            if (ModelState.IsValid)
            {
                //The model is valid - update the product and redisplay the grid.
                productService.Update(product);

                //GridRouteValues() is an extension method which returns the 
                //route values defining the grid state - current page, sort expression, filter etc.
                RouteValueDictionary routeValues = this.GridRouteValues();

                return RedirectToAction("ServerEditing", routeValues);
            }

            //The model is invalid - render the current view to show any validation errors
            return View("ServerEditing", productService.Read());
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Destroy(ProductViewModel product)
        {
            RouteValueDictionary routeValues;

            //Delete the record
            productService.Destroy(product);

            routeValues = this.GridRouteValues();

            //Redisplay the grid
            return RedirectToAction("ServerEditing", routeValues);
        }
    }
}
