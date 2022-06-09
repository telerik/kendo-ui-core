---
title: Ajax Binding
page_title: Ajax Binding
description: "Get started with the Scheduler component for {{ site.framework }} and learn how to configure it for Ajax binding."
previous_url: /helpers/scheduling/scheduler/ajax-editing
slug: htmlhelpers_scheduler_ajaxbinding_aspnetcore
position: 1
---

# Ajax Binding

You can configure the Scheduler for Ajax binding.

For a complete example, refer to the [demo on binding the Scheduler to remote data](https://demos.telerik.com/{{ site.platform }}/scheduler/resources).

```HtmlHelper
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.TimelineView();
        })
        .Timezone("Etc/UTC")
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.RecurrenceId(f => f.RecurrenceID);
                m.Field(f => f.Title).DefaultValue("No title");
                m.Field(f => f.OwnerID).DefaultValue(1);
            })
            .Read("Read", "Scheduler")
            .Create("Create", "Scheduler")
            .Destroy("Destroy", "Scheduler")
            .Update("Update", "Scheduler")
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    @{
        string defaultTitle = "No Title";
    }

    <kendo-scheduler name="scheduler"
        date="new DateTime(2013, 6, 13)"
        start-time="new DateTime(2013, 6, 13, 7, 0, 0, 0)"
        height="600"
        timezone="Etc/UTC">
        <views>
            <view type="day"></view>
            <view type="week" selected="true"></view>
            <view type="timeline"></view>
        </views>
        <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Read", "Scheduler")" />
                <create url="@Url.Action("Create", "Scheduler")" />
                <destroy url="@Url.Action("Destroy", "Scheduler")" />
                <update url="@Url.Action("Update", "Scheduler")" />
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
{% endif %}
```Controller
    public class SchedulerController : Controller
    {
        private ISchedulerEventService<TaskViewModel> taskService;

        public SchedulerController(
            ISchedulerEventService<TaskViewModel> schedulerTaskService)
        {
            taskService = schedulerTaskService;
        }

        public IActionResult Index()
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
            //example custom validation:
            if (task.Start.Hour < 8 || task.Start.Hour > 22)
            {
                ModelState.AddModelError("start", "Start date must be in working hours (8h - 22h)");
            }

            if (ModelState.IsValid)
            {
                taskService.Update(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }
    }
```

## See Also

* [Binding the Scheduler HtmlHelper for {{ site.framework }} to Remote Data (demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/resources)
* [Server-Side API](/api/scheduler)
