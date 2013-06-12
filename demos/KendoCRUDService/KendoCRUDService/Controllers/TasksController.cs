using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KendoCRUDService.Models;
using KendoCRUDService.Common;

namespace KendoCRUDService.Controllers
{
    public class TasksController : Controller
    {
        public ActionResult Index()
        {
            return this.Jsonp(TasksRepository.All());
        }                       
        
        public JsonResult Update()
        {
            var models = this.DeserializeObject<IEnumerable<TaskViewModel>>("models");
            if (models != null)
            {
                TasksRepository.Update(models.First());
            }
            return this.Jsonp(models);
        }
        
        public JsonResult Destroy()
        {
            var events = this.DeserializeObject<IEnumerable<TaskViewModel>>("models");

            if (events != null)
            {
                TasksRepository.Delete(events.First());
            }
            return this.Jsonp(events);
        }
        
        public JsonResult Create()
        {
            var events = this.DeserializeObject<IEnumerable<TaskViewModel>>("models");
            if (events != null)
            {
                TasksRepository.Insert(events.First());
            }
            return this.Jsonp(events);
        }

    }
}
