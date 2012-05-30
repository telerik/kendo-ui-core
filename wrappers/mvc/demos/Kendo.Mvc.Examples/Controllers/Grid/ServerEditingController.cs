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
            return View(SessionProductRepository.All());
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create(ProductViewModel product)
        {   
            if (ModelState.IsValid)
            {
                //The model is valid - insert the product and redisplay the grid.
                SessionProductRepository.Insert(product);

                //GridRouteValues() is an extension method which returns the 
                //route values defining the grid state - current page, sort expression, filter etc.
                RouteValueDictionary routeValues = this.GridRouteValues();

                return RedirectToAction("ServerEditing", routeValues);
            }

            //The model is invalid - render the current view to show any validation errors
            return View("ServerEditing", SessionProductRepository.All());
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Update(ProductViewModel product)
        {   
            if (ModelState.IsValid)
            {
                //The model is valid - update the product and redisplay the grid.
                SessionProductRepository.Update(product);

                //GridRouteValues() is an extension method which returns the 
                //route values defining the grid state - current page, sort expression, filter etc.
                RouteValueDictionary routeValues = this.GridRouteValues();

                return RedirectToAction("ServerEditing", routeValues);
            }

            //The model is invalid - render the current view to show any validation errors
            return View("ServerEditing", SessionProductRepository.All());
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Destroy(int productID)
        {
            //Find a product with ProductID equal to the id action parameter
            ProductViewModel product = SessionProductRepository.One(p => p.ProductID == productID);

            RouteValueDictionary routeValues;

            if (product == null)
            {
                //A product with the specified id does not exist - redisplay the grid

                //GridRouteValues() is an extension method which returns the 
                //route values defining the grid state - current page, sort expression, filter etc.
                routeValues = this.GridRouteValues();

                return RedirectToAction("ServerEditing", routeValues);
            }

            //Delete the record
            SessionProductRepository.Delete(product);

            routeValues = this.GridRouteValues();

            //Redisplay the grid
            return RedirectToAction("ServerEditing", routeValues);
        }
    }
}
