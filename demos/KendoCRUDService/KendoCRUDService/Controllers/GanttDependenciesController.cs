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
    public class GanttDependenciesController : Controller
    {
        public ActionResult Index()
        {
            return this.Jsonp(GanttDependencyRepository.All());
        }

        public JsonResult Update()
        {
            var models = this.DeserializeObject<IEnumerable<GanttDependencyModel>>("models");
            if (models != null)
            {
                GanttDependencyRepository.Update(models);
            }
            return this.Jsonp(models);
        }

        public ActionResult Destroy()
        {
            var models = this.DeserializeObject<IEnumerable<GanttDependencyModel>>("models");

            if (models != null)
            {
                GanttDependencyRepository.Delete(models);
            }
            return this.Jsonp(models);
        }

        public ActionResult Create()
        {
            var models = this.DeserializeObject<IEnumerable<GanttDependencyModel>>("models");
            if (models != null)
            {
                GanttDependencyRepository.Insert(models);
            }
            return this.Jsonp(models);
        }
    }
}
