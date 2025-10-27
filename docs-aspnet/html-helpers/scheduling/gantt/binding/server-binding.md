---
title: Local Binding
page_title: Local Binding
description: "Learn how to configure the Telerik UI Gantt for {{ site.framework }} to bind to a local dataset."
slug: htmlhelpers_gantt_serverbinding_aspnetcore
position: 1
---

# Local Binding

When configured for local binding, the Gantt serializes the data as part of its `DataSource` and `DependenciesDataSource` and performs all data operations, such as paging, sorting, and filtering, on the client.

For a runnable example, refer to the [demo on local binding of the Gantt](https://demos.telerik.com/{{ site.platform }}/gantt/serverbinding).

Local binding is ideal for scenarios where you have a relatively small dataset of tasks and dependencies that can be loaded in memory during the initial page rendering. This approach provides fast client-side operations since all project data is immediately available without requiring additional server requests. The data is retrieved server-side and passed to the view where it gets bound to the Gantt component through the `ViewData` or `ViewBag` collections.

## Configuration

To configure the Gantt for local binding, follow the next steps.

### Setting the Data Model Classes

Define the data model classes that implement the required interfaces for the **Tasks** and **Dependencies**. These model classes serve as the contract between your server-side data and the Gantt component, ensuring proper serialization and data binding.

The following example demonstrates the `TaskViewModel` class that represents the model of the **Tasks**. The class extends the `IGanttTask` interface and defines all the required properties for Gantt tasks:

```C#
public class TaskViewModel : IGanttTask
{
    public int TaskID { get; set; }
    //ParentID should be nullable:
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
```

The following example demonstrates the `DependencyViewModel` class that represents the model of the **Dependencies**. The class extends the `IGanttDependency` interface and defines all the required properties for Gantt dependencies:

```C#
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
```

## Binding to Items from ViewData

The following example demonstrates how to bind the Gantt to items by using the `ViewData` configuration.

```C# Controller
public ActionResult Index()
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
```HtmlHelper
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

```C# Controller
public ActionResult Index()
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
```HtmlHelper
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

* [Local Data Binding by the Gantt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/serverbinding)
* [Server-Side API of the Gantt HtmlHelper](/api/gantt)
{% if site.core %}
* [Server-Side API of the Gantt TagHelper](/api/taghelpers/gantt)
{% endif %}
