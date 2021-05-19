---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Gantt HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/gantt, /helpers/scheduling/gantt/overview
slug: htmlhelpers_gantt_aspnetcore
position: 1
---

# Gantt HtmlHelper Overview

The Telerik UI Gantt HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Gantt widget.

The Gantt displays a set of tasks and dependencies which are used to visualize project-planning data. It provides a TreeList section where the user can edit the tasks, and sort and reorder them in a grid-like fashion, and a Timeline section where the tasks and dependencies are visualized under an adjustable time ruler. The user can resize, move, edit and remove them. The Gantt also supports the display of the Timeline section in the day, week, and month views.

* [Demo page for the Gantt](https://demos.telerik.com/{{ site.platform }}/gantt/index)

## Initializing the Gantt

The following example demonstrates how to define the Gantt by using the Gantt HtmlHelper.

```Razor
@(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
    .Name("gantt")
    .Columns(columns =>
    {
        columns.Bound(c => c.TaskID).Title("ID").Width(50);
        columns.Bound(c => c.Title).Editable(true).Sortable(true);
        columns.Bound(c => c.Start).Width(100).Editable(true).Sortable(true);
        columns.Bound(c => c.End).Width(100).Editable(true).Sortable(true);
    })
    .Views(views =>
    {
        views.DayView();
        views.WeekView(weekView => weekView.Selected(true));
        views.MonthView();
    })
    .Height(700)
    .ShowWorkHours(false)
    .ShowWorkDays(false)
    .Snap(false)
    .DataSource(d => d
        .Model(m =>
        {
            m.Id(f => f.TaskID);
            m.ParentId(f => f.ParentID);
            m.Field(f => f.Expanded).DefaultValue(true);
        })
        .Read("ReadTasks", "Gantt")
        .Create("CreateTask", "Gantt")
        .Destroy("DestroyTask", "Gantt")
        .Update("UpdateTask", "Gantt")
    )
    .DependenciesDataSource(d => d
        .Model(m =>
        {
            m.Id(f => f.DependencyID);
            m.PredecessorId(f => f.PredecessorID);
            m.SuccessorId(f => f.SuccessorID);
        })
        .Read("ReadDependencies", "Gantt")
        .Create("CreateDependency", "Gantt")
        .Destroy("DestroyDependency", "Gantt")
    )
)
```
```Controller
    public partial class GanttController : Controller
    {
        private IGanttTaskService taskService;
        private IGanttDependencyService dependencyService;

        public GanttController(
            IGanttTaskService ganttTaskService,
            IGanttDependencyService ganttDependencyService)
        {
            taskService = ganttTaskService;
            dependencyService = ganttDependencyService;
        }

        [Demo]
        public ActionResult Index()
        {
            return View();
        }

        public virtual JsonResult ReadTasks([DataSourceRequest] DataSourceRequest request)
        {
            return Json(taskService.GetAll().ToDataSourceResult(request));
        }

        public virtual JsonResult DestroyTask([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Delete(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult CreateTask([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Insert(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult UpdateTask([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Update(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult ReadDependencies([DataSourceRequest] DataSourceRequest request)
        {
            return Json(dependencyService.GetAll().ToDataSourceResult(request));
        }

        public virtual JsonResult DestroyDependency([DataSourceRequest] DataSourceRequest request, DependencyViewModel dependency)
        {
            if (ModelState.IsValid)
            {
                dependencyService.Delete(dependency);
            }

            return Json(new[] { dependency }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult CreateDependency([DataSourceRequest] DataSourceRequest request, DependencyViewModel dependency)
        {
            if (ModelState.IsValid)
            {
                dependencyService.Insert(dependency);
            }

            return Json(new[] { dependency }.ToDataSourceResult(request, ModelState));
        }
    }
```

## Basic Configuration

The following example demonstrates the basic configuration of the Gantt HtmlHelper.

```
@(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
    .Name("gantt")
    .Columns(columns =>
    {
        columns.Bound(c => c.Title).Editable(true).Sortable(true);
        columns.Resources("resources").Editable(true).Title("Assigned Resources");
        columns.Bound(c => c.Start).Width(100).Editable(true).Sortable(true);
        columns.Bound(c => c.End).Width(100).Editable(true).Sortable(true);
    })
    .Views(views =>
    {
        views.DayView();
        views.WeekView(weekView => weekView.Selected(true));
        views.MonthView();
    })
    .Height(700)
    .RowHeight(62)
    .ShowWorkHours(false)
    .ShowWorkDays(false)
    .Snap(false)
    .Pdf(pdf => pdf
        .FileName("Kendo UI Gantt Export.pdf")
        .ProxyURL(Url.Action("Pdf_Export_Save", "Gantt"))
    )
    .Resizable(true)
    .DataSource(d => d
        .Model(m =>
        {
            m.Id(f => f.TaskID);
            m.ParentId(f => f.ParentID);
            m.Field(f => f.Expanded).DefaultValue(true);
        })
        .Read("ReadTasks", "Gantt")
        .Create("CreateTask", "Gantt")
        .Destroy("DestroyTask", "Gantt")
        .Update("UpdateTask", "Gantt")
    )
    .DependenciesDataSource(d => d
        .Model(m =>
        {
            m.Id(f => f.DependencyID);
            m.PredecessorId(f => f.PredecessorID);
            m.SuccessorId(f => f.SuccessorID);
        })
        .Read("ReadDependencies", "Gantt")
        .Create("CreateDependency", "Gantt")
        .Destroy("DestroyDependency", "Gantt")
    )
    .Resources(r => r
        .Field("resources")
        .DataColorField("Color")
        .DataTextField("Name")
        .DataSource(d => d
            .Custom()
            .Schema(s => s
                .Model(m => m.Id("ID"))
                .Data("Data")
            )
            .Transport(t =>
            {
                t.Read("ReadResources", "Gantt");
            })
        )
    )
    .Assignments<ResourceAssignmentViewModel>(a => a
        .DataTaskIdField("TaskID")
        .DataResourceIdField("ResourceID")
        .DataValueField("Units")
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.ID);
            })
            .Read("ReadAssignments", "Gantt")
            .Create("CreateAssignment", "Gantt")
            .Destroy("DestroyAssignment", "Gantt")
            .Update("UpdateAssignment", "Gantt")
        )
    )
)
```

## Functionality and Features

* [Layout]({% slug htmlhelpers_gantt_layout_aspnetcore %})
* [Data binding]({% slug htmlhelpers_gantt_binding_aspnetcore %})
* [Columns]({% slug htmlhelpers_gantt_columns_aspnetcore %})
* [Planned vs Actual]({% slug htmlhelpers_gantt_planned_vs_actual_aspnetcore %})
* [Resources]({% slug htmlhelpers_gantt_resources_aspnetcore %})
* [Templates]({% slug htmlhelpers_gantt_templates_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_gantt %})

## Events

For a complete example on basic Gantt events, refer to the [demo on using the events of the Gantt](https://demos.telerik.com/{{ site.platform }}/gantt/events).

## Referencing Existing Instances

To reference an existing Gantt instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [client-side Gantt API](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt#methods) to control its behavior.

    // Place this after the Gantt for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The Name() of the Gantt is used to get its client-side instance.
            var gantt = $("#gantt").data("kendoGantt");
        });
    </script>

## See Also

* [Basic Usage of the Gantt HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt)
* [Using the API of the Gantt HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/api)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
* [Server-Side API](/api/gantt)
