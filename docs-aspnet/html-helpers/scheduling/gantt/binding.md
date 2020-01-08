---
title: Data Binding
page_title: Data Binding
description: "Learn the binding options for the Telerik UI Gantt HtmlHelper for {{ site.framework }}."
previous_url: /helpers/scheduling/gantt/server-binding
slug: htmlhelpers_gantt_binding_aspnetcore
position: 2
---

# Data Binding

By default, the Telerik UI Gantt for ASP.NET MVC performs server-side requests (`HTTP` and `GET`) when doing paging, sorting, and filtering.

You can also render the view with the data for the tasks and dependences. You have to implement the `IGanttTask` and `IGanttDependency` interfaces in the data models for the `GanttTasks` and `GantDependencies` respectively.

## Setting the Data Model Classes

You can bind the Gantt by using the data model classes for its Tasks and Dependencies.

The following example demonstrates how to bind the Gantt through the `TaskViewModel`.

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

The following example demonstrates how to bind the Gantt through the `DependencyViewModel`.

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

## Binding to Items from ViewData

The following example demonstrates how to bind the Gantt to items by using the `ViewData` configuration.

```Controller
    public IActionResult ServerBinding()
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
```Razor
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

## Binding to Items from ViewBag

The following example demonstrates how to bind the Gantt to items by using the `ViewBag` configuration.

```Controller
    public IActionResult ServerBinding()
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
```Razor
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

* [Basic Usage of the Gantt HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
* [Server-Side API](/api/gantt)
