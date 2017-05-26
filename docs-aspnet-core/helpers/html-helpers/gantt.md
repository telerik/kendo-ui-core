---
title: Gantt
page_title: Gantt | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Gantt HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_gantt_aspnetcore
---

# Gantt HtmlHelper Overview

The Gantt HtmlHelper extension is a server-side wrapper for the [Kendo UI Gantt](http://demos.telerik.com/kendo-ui/gantt/index) widget.

It allows you to configure the Kendo UI Gantt from server-side code, helps with data binding and editing. The [Gantt](http://docs.telerik.com/kendo-ui/controls/scheduling/gantt/overview) displays a set of tasks and dependencies, which are used to visualize project planning data. The widget provides a TreeList section where the tasks can be edited, sorted and reordered in a grid-like fashion, as well as a Timeline section, where the tasks and dependencies are visualized under an adjustable time ruler, and can be resized, moved, edited and removed. It can also display the Timeline in three different views – day, week and month.

For more information on the HtmlHelper, refer to the article on the [Gantt HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/gantt/overview).

## Basic Usage

The following example demonstrates how to define the Gantt by using the Gantt HtmlHelper.

###### Example

```tab-Razor
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
```tab-Controller
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

## Configuration

The following example demonstrates the basic configuration of the Gantt HtmlHelper and how to get the Scheduler instance.

###### Example

```tab-Razor

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

<script>
$(function() {
    //Notice that the Name() of the Gantt is used to get its client-side instance.
    var gantt = $("#gantt").data("kendoGantt");
});
</script>
```

## See Also

* [JavaScript API Reference of the Gantt](http://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
* [Gantt HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/gantt/overview)
* [Gantt Official Demos](http://demos.telerik.com/aspnet-core/gantt/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
