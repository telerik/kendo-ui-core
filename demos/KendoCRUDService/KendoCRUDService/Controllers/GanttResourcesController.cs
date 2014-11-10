using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KendoCRUDService.Models;
using KendoCRUDService.Common;

namespace KendoCRUDService.Controllers
{
    public class GanttResourcesController : Controller
    {
        public ActionResult Index()
        {
            return this.Jsonp(GanttResourcesRepository.All());
        }
    }
}
