using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult Index()
        {
            return View(new NorthwindDataContext().Products);
        }

        public ActionResult LocalData()
        {
            return View(new NorthwindDataContext().Products);
        }

        public ActionResult ServerHierarchy()
        {
            return View(new NorthwindDataContext().Employees);
        }

        public ActionResult ServerDetails()
        {
            return View(new NorthwindDataContext().Employees);
        }
    }
}