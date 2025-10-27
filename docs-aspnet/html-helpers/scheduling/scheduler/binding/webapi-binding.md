---
title: Web API Binding
page_title: Web API Binding
previous_url: /html-helpers/scheduling/scheduler/how-to/web-api-binding, /helpers/scheduling/scheduler/how-to/web-api-binding
description: "Learn how to enable the Web API binding capabilities of the Telerik UI Scheduler for {{ site.framework }}."
slug: htmlhelpers_scheduler_webapi_binding
position: 4
---

# Web API Binding

Web API is an application programming interface for a web application or server that utilizes the [HTTP protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) for communication. It enables you to make the server-side of the application more monolithic when it comes to establishing communication between clients and websites to have data access.

{% if site.core %}
For a runnable example, refer to the [demo on Web API binding of the Scheduler component](https://demos.telerik.com/{{ site.platform }}/scheduler/webapi).
{% else %}
For a runnable example, refer to the [demo on Web API binding of the Scheduler component](https://demos.telerik.com/{{ site.platform }}/scheduler/webapi) or review the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/SchedulerEditingWebApi) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master)
{% endif %}

{% if site.mvc %}

## Setting up the Application for Web API Binding

To ensure that the application is configured for Web API binding: 

* Configure the Web API by calling `GlobalConfiguration.Configure` in the `Application_Start` method.

  ```C#
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
  ```

* Create a file named `WebApiConfig.cs` into the `App_Start` folder and configure the default Web API routing convention.
 
  ```C#
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services.
            // Web API routes.
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
  ```

{% endif %}

## Adding a Web API Controller

To support writing and reading data using Web API endpoints, the {% if site.core %} `ControllerBase` {%else%} `ApiController` {% endif %} base class needs to be inherited for a given controller instance.

{% if site.core %}
```C#
    [Route("api/[controller]")]
    public class TaskController : Controller
    {
        private readonly ISchedulerEventService<TaskViewModel> service;

        public TaskController(
            ISchedulerEventService<TaskViewModel> schedulerTaskService)
        {
            service = schedulerTaskService;
        }

        // GET api/task
        [HttpGet]
        public DataSourceResult Get([DataSourceRequest]DataSourceRequest request)
        {
            return service.GetAll().ToDataSourceResult(request);
        }

        // POST api/task
        [HttpPost]
        public IActionResult Post(TaskViewModel task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(v => v.Errors).Select(error => error.ErrorMessage));
            }

            service.Insert(task, null);

            return new ObjectResult(new DataSourceResult { Data = new[] { task }, Total = 1 });
        }

        // PUT api/task/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, TaskViewModel task)
        {
            if (ModelState.IsValid && id == task.TaskID)
            {
                try
                {
                    service.Update(task, null);
                }
                catch (DbUpdateConcurrencyException)
                {
                    return new NotFoundResult();
                }

                return new StatusCodeResult(200);
            }
            else
            {
                return BadRequest(ModelState.Values.SelectMany(v => v.Errors).Select(error => error.ErrorMessage));
            }
        }

        // DELETE api/task/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                service.Delete(new TaskViewModel { TaskID = id }, null);
            }
            catch (DbUpdateConcurrencyException)
            {
                return new NotFoundResult();
            }

            return new StatusCodeResult(200);
        }
    }
```
{% else %}
```C#
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
```
{% endif %}

## Configuring the Scheduler DataSource for Web API Binding

To enable the CRUD operations that support Web API Binding, explicitly add a `WebApi()` configuration method within the DataSource. {% if site.mvc %} Also, specify explicitly the Web API endpoints by using the `Url.HttpRouteUrl()` extension method. {% endif %}

> Note that a unique identifier for both the `Update` and `Delete` operations is passed as a [`RouteValueDictionary`]{% if site.core %}(https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.routing.routevaluedictionary?view=aspnetcore-7.0){% else %}(https://learn.microsoft.com/en-us/dotnet/api/system.web.routing.routevaluedictionary?view=netframework-4.8.1){% endif %}, which is then processed on the server {% if site.core %}through the [`HttpMethodAttribute`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.routing.httpmethodattribute?view=aspnetcore-7.0).{% else %} as an Action Method argument.{% endif %}

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2022, 6, 13))
        .StartTime(new DateTime(2022, 6, 13, 7, 00, 00))
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.MonthView();
            views.AgendaView();
            views.TimelineView();
        })
        .Timezone("Etc/UTC")
        .DataSource(d => d
            .WebApi()
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.Field(f => f.Title).DefaultValue("No title");
                m.RecurrenceId(f => f.RecurrenceID);
            })
            .Read(read => read.Action("Get", "Task"))
            .Create(create => create.Action("Post", "Task"))
            .Update(update => update.Action("Put", "Task", new { id = "{0}" })) // Id of the to-be-updated record that will be processed on the server-side.
            .Destroy(destroy => destroy.Action("Delete", "Task", new { id = "{0}" })) // Id of the to-be-deleted record that will be processed on the server-side.
        )
    )
```
```TagHelper
    <kendo-scheduler name="scheduler" 
        date="new DateTime(2022, 6, 13)"
        start-time="new DateTime(2022, 6, 13, 7, 00, 00)"
        height="600"
        timezone="Etc/UTC">
        <views>
            <view type="day"></view>
            <view type="week" selected="true"></view>
            <view type="month"></view>
            <view type="agenda"></view>
            <view type="timeline"></view>
        </views>
        <scheduler-datasource type="@DataSourceTagHelperType.WebApi">
            <transport>
                <read url="/api/Task" action="get"/>
                <create url="/api/Task" action="post"/>
                <update url="/api/Task/{0}" action="put"/>
                <destroy url="/api/Task/{0}" action="delete"/>
            </transport>
            <schema data="Data" total="Total" errors="Errors">
                <scheduler-model id="TaskID">
                    <fields>
                        <field name="TaskID" type="number"></field>
                        <field name="title" from="Title" type="string" default-value="@defaultTitle"></field>
                        <field name="start" from="Start" type="date"></field>
                        <field name="end" from="End" type="date"></field>
                        <field name="description" from="Description" type="string"></field>
                        <field name="recurrenceId" from="RecurrenceID" type="number" default-value=null></field>
                        <field name="recurrenceRule" from="RecurrenceRule" type="string" ></field>
                        <field name="recurrenceException" from="RecurrenceException" type="string"></field>
                        <field name="startTimezone" from="StartTimezone" type="string"></field>
                        <field name="endTimezone" from="EndTimezone" type="string"></field>
                        <field name="isAllDay" from="IsAllDay" type="boolean"></field>
                    </fields>
                </scheduler-model>
            </schema>
        </scheduler-datasource>
    </kendo-scheduler>
```
{% else %}
```
@(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
    .Name("scheduler")
    .Date(new DateTime(2022, 6, 13))
    .StartTime(new DateTime(2022, 6, 13, 7, 00, 00))
    .Height(600)
    .Views(views =>
    {
        views.DayView();
        views.WeekView(weekView => weekView.Selected(true));
        views.MonthView();
        views.AgendaView();
        views.TimelineView();
    })
    .Timezone("Etc/UTC")
    .DataSource(d => d
        .WebApi()
        .Model(m =>
        {
            m.Id(f => f.TaskID);
            m.Field(f => f.Title).DefaultValue("No title");
            m.RecurrenceId(f => f.RecurrenceID);
        })
        .Read(read => read.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Task" })))
        .Create(create => create.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Task" })))
        .Update(update => update.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Task", id = "{0}" }))) // Id of the to-be-updated record that will be processed on the server-side.
        .Destroy(destroy => destroy.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Task", id = "{0}" }))) // Id of the to-be-deleted record that will be processed on the server-side.
    )
)
```
{% endif %}

## See Also

* [Web API Binding by the Scheduler HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/webapi)
* [Server-Side API](/api/grid)