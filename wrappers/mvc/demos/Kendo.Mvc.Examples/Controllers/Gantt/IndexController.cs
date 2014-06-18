namespace Kendo.Mvc.Examples.Controllers
{﻿
    using System.Collections.Generic;
    using System.Data.Linq;
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.Examples.Models;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;
    using System;
    using Kendo.Mvc.Examples.Models.Gantt;

    public partial class GanttController : Controller
    {
        private GanttTaskService taskService;

        public GanttController()
        {
            this.taskService = new GanttTaskService();
        }

        public ActionResult Index()
        {
            return View();
        }


        public virtual JsonResult Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(taskService.GetAll().ToDataSourceResult(request));
        }

        public virtual JsonResult Destroy([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Delete(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Create([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Insert(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Update([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Update(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }
    }
}