using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KendoCRUDService.Models;
using KendoCRUDService.Common;
using System.Web.Script.Serialization;

namespace KendoCRUDService.Controllers
{
    public class GanttTasksController : Controller
    {
        public ActionResult Index()
        {
            return this.Jsonp(GanttTaskRepository.All());
        }

        public JsonResult Update()
        {
            var models = this.DeserializeObject<IEnumerable<GanttTaskModel>>("models");
            if (models != null)
            {
                GanttTaskRepository.Update(models);
            }
            return this.Jsonp(models);
        }

        public ActionResult Destroy()
        {
            var tasks = this.DeserializeObject<IEnumerable<GanttTaskModel>>("models");

            if (tasks != null)
            {
                GanttTaskRepository.Delete(tasks);
            }
            return this.Jsonp(tasks);
        }

        public ActionResult Create()
        {
            var products = this.DeserializeObject<IEnumerable<GanttTaskModel>>("models");
            if (products != null)
            {
                GanttTaskRepository.Insert(products);
            }
            return this.Jsonp(products);
        }
    }
}
