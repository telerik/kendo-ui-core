using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KendoCRUDService.Models;

namespace KendoCRUDService.Controllers
{
    public class ProductsController : Controller
    {
        public ActionResult Index()
        {
            return Json(ProductRepository.All(), JsonRequestBehavior.AllowGet);
        }        

        [HttpPost]
        public JsonResult Update(IEnumerable<ProductModel> models)
        {
            if (ModelState.IsValid)
            {
                ProductRepository.Update(models);
            }
            return Json(models);
        }

        [HttpPost]
        public ActionResult Destroy(IEnumerable<ProductModel> product)
        {
            if (ModelState.IsValid)
            {
                ProductRepository.Delete(product);
            }
            return Json(product);
        }

        [HttpPost]
        public ActionResult Create(IEnumerable<ProductModel> product)
        {
            if (ModelState.IsValid)
            {
                ProductRepository.Insert(product);
            }
            return Json(product);
        }
    }
}
