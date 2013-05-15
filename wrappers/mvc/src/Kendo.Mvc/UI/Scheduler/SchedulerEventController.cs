namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;

    public abstract class SchedulerEventController<T> : Controller, ISchedulerEventController<T>
        where T : class, ISchedulerEvent
    {
        private ISchedulerEventService<T> eventsService;

        //public SchedulerEventController()
        //    : this(new SchedulerEventService<T>())
        //{
        //}

        public SchedulerEventController(ISchedulerEventService<T> eventsService)
        {
            this.eventsService = eventsService;
        }

        public virtual JsonResult Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(eventsService.GetAll().ToDataSourceResult(request));
        }

        public virtual JsonResult Destroy(T schedulerEvent)
        {
            if (ModelState.IsValid)
            {
                eventsService.Delete(schedulerEvent, ModelState);
            }

            return Json(ModelState.ToDataSourceResult());
        }

        public virtual JsonResult Create(T schedulerEvent)
        {
            if (ModelState.IsValid)
            {
                eventsService.Insert(schedulerEvent, ModelState);
            }

            return Json(ModelState.ToDataSourceResult());
        }

        public virtual JsonResult Update(T schedulerEvent)
        {
            if (ModelState.IsValid)
            {
                eventsService.Update(schedulerEvent, ModelState);
            }

            return Json(ModelState.ToDataSourceResult());
        }
    }
}
