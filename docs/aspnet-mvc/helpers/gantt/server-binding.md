---
title: Server Binding
page_title: Server Binding | Kendo UI Gantt HtmlHelper
description: "Configure the Kendo UI Gamtt for ASP.NET MVC for server binding."
slug: serverbinding_gantthelper_aspnetmvc
position: 2
---

# Server Binding

By default, the Kendo UI Gantt for ASP.NET MVC performs `HTTP GET` requests to load both its tasks and dependencies from the server.

There is an option to render the view with the data for the tasks and dependences. The data models for the `GanttTasks` and `GantDependencies` should implement `IGanttTask` and `IGanttDependency` interfaces respectively.

## Set Data Model Classes

Below are listed the data model classes for the Tasks and Dependencies and the available options on how to bind the Kendo UI Gantt for ASP.NET MVC.

### TaskViewModel

    public class TaskViewModel : IGanttTask
    {
        public int TaskID { get; set; }
        public int? ParentID { get; set; }

        public string Title { get; set; }

        private DateTime start;
        public DateTime Start
        {
            get
            {
                return start;
            }
            set
            {
                start = value.ToUniversalTime();
            }
        }

        private DateTime end;
        public DateTime End
        {
            get
            {
                return end;
            }
            set
            {
                end = value.ToUniversalTime();
            }
        }

        public bool Summary { get; set; }
        public bool Expanded { get; set; }
        public decimal PercentComplete { get; set; }
        public int OrderId { get; set; }

        public GanttTask ToEntity()
        {
            return new GanttTask
            {
                ID = TaskID,
                ParentID = ParentID,
                Title = Title,
                Start = Start,
                End = End,
                Summary = Summary,
                Expanded = Expanded,
                PercentComplete = PercentComplete,
                OrderID = OrderId
            };
        }
    }

### DependencyViewModel

    public class DependencyViewModel : IGanttDependency
    {
        public int DependencyID { get; set; }

        public int PredecessorID { get; set; }
        public int SuccessorID { get; set; }
        public DependencyType Type { get; set; }

        public GanttDependency ToEntity()
        {
            return new GanttDependency
            {
                ID = DependencyID,
                PredecessorID = PredecessorID,
                SuccessorID = SuccessorID,
                Type = (int)Type
            };
        }
    }

## Bind to Items from ViewData

```tab-Action

    public ActionResult ServerBinding()
    {
        var sampleEntities = new SampleEntities();

        ViewData["tasks"] = sampleEntities.GanttTasks
            .ToList().Select(task => new TaskViewModel
            {
                TaskID = task.ID,
                Title = task.Title,
                Start = DateTime.SpecifyKind(task.Start, DateTimeKind.Utc),
                End = DateTime.SpecifyKind(task.End, DateTimeKind.Utc),
                ParentID = task.ParentID,
                PercentComplete = task.PercentComplete,
                OrderId = task.OrderID,
                Expanded = task.Expanded,
                Summary = task.Summary
            }).AsQueryable();


        ViewData["dependencies"] = sampleEntities.GanttDependencies
            .ToList().Select(dependency => new DependencyViewModel
            {
                DependencyID = dependency.ID,
                PredecessorID = dependency.PredecessorID,
                SuccessorID = dependency.SuccessorID,
                Type = (DependencyType)dependency.Type
            }).AsQueryable();

        return View();
    }
```
```tab-ASPX

    <%: Html.Kendo()
        .Gantt<TaskViewModel, DependencyViewModel>((IEnumerable<TaskViewModel>)ViewData["tasks"], (IEnumerable<DependencyViewModel>)ViewData["dependencies"])
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.TaskID).Title("ID").Width(50);
            columns.Bound("title").Editable(true).Sortable(true);
            columns.Bound("start").Title("Start Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
            columns.Bound("end").Title("End Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
        })
        .Editable(false)
        .Height(400)
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.ParentId(f => f.ParentID);
                m.OrderId(f => f.OrderId);
                m.Field(f => f.Expanded).DefaultValue(true);
            })
        )
        .DependenciesDataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.DependencyID);
                m.PredecessorId(f => f.PredecessorID);
                m.SuccessorId(f => f.SuccessorID);
                m.Type(f => f.Type);
            })
        )
    %>
```
```tab-Razor

    @(Html.Kendo()
        .Gantt<TaskViewModel, DependencyViewModel>((IEnumerable<TaskViewModel>)ViewData["tasks"], (IEnumerable<DependencyViewModel>)ViewData["dependencies"])
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.TaskID).Title("ID").Width(50);
            columns.Bound("title").Editable(true).Sortable(true);
            columns.Bound("start").Title("Start Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
            columns.Bound("end").Title("End Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
        })
        .Editable(false)
        .Height(400)
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.ParentId(f => f.ParentID);
                m.OrderId(f => f.OrderId);
                m.Field(f => f.Expanded).DefaultValue(true);
            })
        )
        .DependenciesDataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.DependencyID);
                m.PredecessorId(f => f.PredecessorID);
                m.SuccessorId(f => f.SuccessorID);
                m.Type(f => f.Type);
            })
        )
    )
```

## Bind to Items from ViewBag

###### Example

```tab-Action

    public ActionResult ServerBinding()
    {
        var sampleEntities = new SampleEntities();

        ViewBag.Tasks = sampleEntities.GanttTasks
            .ToList().Select(task => new TaskViewModel
            {
                TaskID = task.ID,
                Title = task.Title,
                Start = DateTime.SpecifyKind(task.Start, DateTimeKind.Utc),
                End = DateTime.SpecifyKind(task.End, DateTimeKind.Utc),
                ParentID = task.ParentID,
                PercentComplete = task.PercentComplete,
                OrderId = task.OrderID,
                Expanded = task.Expanded,
                Summary = task.Summary
            }).AsQueryable();


        ViewBag.Dependencies = sampleEntities.GanttDependencies
            .ToList().Select(dependency => new DependencyViewModel
            {
                DependencyID = dependency.ID,
                PredecessorID = dependency.PredecessorID,
                SuccessorID = dependency.SuccessorID,
                Type = (DependencyType)dependency.Type
            }).AsQueryable();

        return View();
    }
```
```tab-ASPX

    <%: Html.Kendo()
        .Gantt<TaskViewModel, DependencyViewModel>((IEnumerable<TaskViewModel>)ViewBag.Tasks, (IEnumerable<DependencyViewModel>)ViewBag.Dependencies)
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.TaskID).Title("ID").Width(50);
            columns.Bound("title").Editable(true).Sortable(true);
            columns.Bound("start").Title("Start Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
            columns.Bound("end").Title("End Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
        })
        .Editable(false)
        .Height(400)
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.ParentId(f => f.ParentID);
                m.OrderId(f => f.OrderId);
                m.Field(f => f.Expanded).DefaultValue(true);
            })
        )
        .DependenciesDataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.DependencyID);
                m.PredecessorId(f => f.PredecessorID);
                m.SuccessorId(f => f.SuccessorID);
                m.Type(f => f.Type);
            })
        )
    %>
```
```tab-Razor

    @(Html.Kendo()
        .Gantt<TaskViewModel, DependencyViewModel>((IEnumerable<TaskViewModel>)ViewBag.Tasks, (IEnumerable<DependencyViewModel>)ViewBag.Dependencies)
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.TaskID).Title("ID").Width(50);
            columns.Bound("title").Editable(true).Sortable(true);
            columns.Bound("start").Title("Start Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
            columns.Bound("end").Title("End Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
        })
        .Editable(false)
        .Height(400)
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.ParentId(f => f.ParentID);
                m.OrderId(f => f.OrderId);
                m.Field(f => f.Expanded).DefaultValue(true);
            })
        )
        .DependenciesDataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.DependencyID);
                m.PredecessorId(f => f.PredecessorID);
                m.SuccessorId(f => f.SuccessorID);
                m.Type(f => f.Type);
            })
        )
    )
```

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Chart:

* [Overview of the Kendo UI Gantt HtmlHelper]({% slug overview_gantthelper_aspnetmvc %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
