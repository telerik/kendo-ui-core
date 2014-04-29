namespace Kendo.Mvc.Examples.Controllers
{
    using System.Web.Mvc;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Examples.Models.Scheduler;
    using System.Net.Http;
    using Kendo.Mvc.Examples.Models;
    using System.Linq;
    using System.Net;
    using System;
    using System.Data.Entity.Infrastructure;

    public partial class SchedulerController
    {
        public ActionResult WebApi()
        {
            return View();
        }
    }

    public class TaskController : System.Web.Http.ApiController
    {
        SchedulerTaskService service;

        public TaskController()
        {
            service = new SchedulerTaskService(new SampleEntities());
        }

        protected override void Dispose(bool disposing)
        {
            service.Dispose();

            base.Dispose(disposing);
        }

        // GET api/task
        public DataSourceResult Get([System.Web.Http.ModelBinding.ModelBinder(typeof(WebApiDataSourceRequestModelBinder))]DataSourceRequest request)
        {
            return service.GetAll().ToDataSourceResult(request);
        }

        // POST api/task
        public HttpResponseMessage Post(TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                service.Insert(task, null);

                var response = Request.CreateResponse(HttpStatusCode.Created, new DataSourceResult { Data = new[] { task }, Total = 1 });
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = task.TaskID }));
                return response;
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(error => error.ErrorMessage);

                return Request.CreateResponse(HttpStatusCode.BadRequest, errors);
            }
        }

        // PUT api/task/5
        public HttpResponseMessage Put(int id, TaskViewModel task)
        {
            if (ModelState.IsValid && id == task.TaskID)
            {
                try
                {
                    service.Update(task, null);
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(error => error.ErrorMessage);
                return Request.CreateResponse(HttpStatusCode.BadRequest, errors);
            }
        }

        // DELETE api/task/5
        public HttpResponseMessage Delete(int id)
        {
            TaskViewModel task = new TaskViewModel
            {
                TaskID = id
            };

            try
            {
                service.Delete(task, null);
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, task);
        }
    }
}
