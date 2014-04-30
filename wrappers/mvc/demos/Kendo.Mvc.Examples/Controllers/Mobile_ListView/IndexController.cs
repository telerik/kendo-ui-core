using Kendo.Mvc.Examples.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Mobile_ListViewController : Controller
    {
        private ProductService productService;

        public Mobile_ListViewController()
        {
            productService = new ProductService(new SampleEntities());
        }

        protected override void Dispose(bool disposing)
        {
            productService.Dispose();

            base.Dispose(disposing);
        }

        public ActionResult Index()
        {
            return View();
        }        
    }
}
