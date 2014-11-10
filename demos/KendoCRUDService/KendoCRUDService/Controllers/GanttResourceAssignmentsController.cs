using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KendoCRUDService.Models;
using KendoCRUDService.Common;
using System.Web.Mvc;

namespace KendoCRUDService.Controllers
{
    public class GanttResourceAssignmentsController : Controller
    {
        public ActionResult Index()
        {
            return this.Jsonp(GanttResourceAssignmentsRepository.All());
        }

        public JsonResult Update()
        {
            var assignments = this.DeserializeObject<IEnumerable<GanttResourceAssignmentModel>>("models");
            if (assignments != null)
            {
                GanttResourceAssignmentsRepository.Update(assignments);
            }
            return this.Jsonp(assignments);
        }

        public ActionResult Destroy()
        {
            var assignments = this.DeserializeObject<IEnumerable<GanttResourceAssignmentModel>>("models");
            if (assignments != null)
            {
                GanttResourceAssignmentsRepository.Delete(assignments);
            }
            return this.Jsonp(assignments);
        }

        public ActionResult Create()
        {
            var assignments = this.DeserializeObject<IEnumerable<GanttResourceAssignmentModel>>("models");
            if (assignments != null)
            {
                GanttResourceAssignmentsRepository.Insert(assignments);
            }
            return this.Jsonp(assignments);
        }
    }
}
