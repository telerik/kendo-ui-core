using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class TooltipController : Controller
    {
        public ActionResult Ajax()
        {
            return View();
        }

        public ActionResult Details(int id)
        {
            ViewBag.ID = id;
            ViewBag.Title = Foods[id];

            return PartialView();
        }

        private IDictionary<int, string> Foods
        {
            get {
                return new Dictionary<int, string>  { 
                    { 11, "Queso Cabrales" },
                    { 12, "Queso Manchego La Pastora" },
                    { 31, "Gorgonzola Telino" },
                    { 32, "Mascarpone Fabioli" },
                    { 33, "Mascarpone Fabioli" },
                    { 59, "Geitost" },
                    { 60, "Raclette Courdavault" },
                    { 69, "Camembert Pierrott" },
                    { 72, "Gudbrandsdalsost" }
                };
            }
        }
    }
}
