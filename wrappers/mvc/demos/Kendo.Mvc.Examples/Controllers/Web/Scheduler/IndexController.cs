namespace Kendo.Mvc.Examples.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Examples.Models.Scheduler;

    public partial class SchedulerController : Controller
    {
        private SchedulerEventService<Task> eventsService;

        public SchedulerController()
        {
            this.eventsService = new SchedulerEventService<Task>();
        }

        public ActionResult Index()
        {
            return View();
        }

        public virtual JsonResult Read([DataSourceRequest] DataSourceRequest request)
        {
                return Json(eventsService.GetAll()
                    .ToList() //TODO: REMOVE IT!
                    .Select(task => new TaskViewModel() { 
                        TaskID = task.TaskID,
                        Title = task.Title,
                        Description = task.Description,
                        Start = DateTime.SpecifyKind(task.Start, DateTimeKind.Utc),
                        End = DateTime.SpecifyKind(task.End, DateTimeKind.Utc),
                        IsAllDay = task.IsAllDay,
                        OwnerID = task.OwnerID,
                        RecurrenceID = task.RecurrenceID,
                        RecurrenceRule = task.RecurrenceRule,
                        RecurrenceException = task.RecurrenceException
                    })
                    .ToDataSourceResult(request));
        }

        public virtual JsonResult Destroy([DataSourceRequest] DataSourceRequest request, TaskViewModel schedulerEvent)
        {
            if (ModelState.IsValid)
            {
                Task schedulerTask = ConvertToEntity(schedulerEvent);

                eventsService.Delete(schedulerTask, ModelState);

                return Json(new[] { ConvertToViewModel(schedulerTask) }.ToDataSourceResult(request, ModelState));
            }

            return Json(ModelState.ToDataSourceResult());
        }

        public virtual JsonResult Create([DataSourceRequest] DataSourceRequest request, TaskViewModel schedulerEvent)
        {
            if (ModelState.IsValid)
            {
                Task schedulerTask = ConvertToEntity(schedulerEvent);

                eventsService.Insert(schedulerTask, ModelState);

                return Json(new[] { ConvertToViewModel(schedulerTask) }.ToDataSourceResult(request, ModelState));
            }

            return Json(ModelState.ToDataSourceResult());
        }

        public virtual JsonResult Update([DataSourceRequest] DataSourceRequest request, TaskViewModel schedulerEvent)
        {
            if (ModelState.IsValid)
            {
                Task schedulerTask = ConvertToEntity(schedulerEvent);

                eventsService.Update(schedulerTask, ModelState);

                return Json(new[] { ConvertToViewModel(schedulerTask) }.ToDataSourceResult(request, ModelState));
            }

            return Json(ModelState.ToDataSourceResult());
        }

        protected override void Dispose(bool disposing)
        {
            eventsService.Dispose();
            base.Dispose(disposing);
        }

        private static Task ConvertToEntity(TaskViewModel task)
        {
            return new Task()
            {
                TaskID = task.TaskID,
                Title = task.Title,
                Description = task.Description,
                Start = task.Start,
                End = task.End,
                IsAllDay = task.IsAllDay,
                OwnerID = task.OwnerID,
                RecurrenceID = task.RecurrenceID,
                RecurrenceRule = task.RecurrenceRule,
                RecurrenceException = task.RecurrenceException
            };
        }

        private static TaskViewModel ConvertToViewModel(Task task)
        {
            return new TaskViewModel()
            {
                TaskID = task.TaskID,
                Title = task.Title,
                Description = task.Description,
                Start = task.Start,
                End = task.End,
                IsAllDay = task.IsAllDay,
                OwnerID = task.OwnerID,
                RecurrenceID = task.RecurrenceID,
                RecurrenceRule = task.RecurrenceRule,
                RecurrenceException = task.RecurrenceException
            };
        }
    }
}
