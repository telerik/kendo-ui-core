using Kendo.Mvc.Examples.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class DiagramController : Controller
    {
        public ActionResult Layout()
        {
            return View();
        }

        public ActionResult _DiagramTree()
        {
            return Json(DiagramDataRepository.DiagramNodes(), JsonRequestBehavior.AllowGet);
        }
    }
}
