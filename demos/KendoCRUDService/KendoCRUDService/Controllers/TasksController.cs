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
            var tasks = this.DeserializeObject<IEnumerable<TaskViewModel>>("models");

            if (tasks != null)
            {
                foreach (var task in tasks)
                {
                    TasksRepository.Update(task);
                }
            }

            return this.Jsonp(tasks);
        }
        
        public JsonResult Destroy()
        {
            var tasks = this.DeserializeObject<IEnumerable<TaskViewModel>>("models");

            if (tasks != null)
            {
                foreach (var task in tasks)
                {
                    TasksRepository.Delete(task);
                }
            }

            return this.Jsonp(tasks);
        }
        
        public JsonResult Create()
        {
            var tasks = this.DeserializeObject<IEnumerable<TaskViewModel>>("models");

            if (tasks != null)
            {
                foreach (var task in tasks)
                {
                    TasksRepository.Insert(task);
                }
            }

            return this.Jsonp(tasks);
        }

    }
}
