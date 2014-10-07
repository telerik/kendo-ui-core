using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KendoCRUDService.Controllers
{
    public class ExportController : Controller
    {
        [HttpPost]
        public ActionResult Index(string contentType, string base64, string fileName)
        {
            if (Request.UrlReferrer.Host.EndsWith("telerik.com"))
            {
                var fileContents = Convert.FromBase64String(base64);

                return File(fileContents, contentType, fileName);
            }

            return new HttpStatusCodeResult(403, "Available only for demos.telerik.com");
        }
    }
}