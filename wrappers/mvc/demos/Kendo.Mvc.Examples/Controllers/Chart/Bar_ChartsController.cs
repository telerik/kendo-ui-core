using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Bar_ChartsController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Column()
        {
            return View();
        }

        public ActionResult Stacked_Bar()
        {
            return View();
        }

        public ActionResult Grouped_Stacked_Bar()
        {
            return View();
        }

        public ActionResult Multiple_Axes()
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