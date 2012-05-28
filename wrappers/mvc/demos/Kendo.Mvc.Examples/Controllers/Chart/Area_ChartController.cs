using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Area_ChartController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Remote_Data()
        {
            return View();
        }

        public ActionResult Local_Data()
        {
            return View(InternetUsersRepository.GetData());
        }
    }
}