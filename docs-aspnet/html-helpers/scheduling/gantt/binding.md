---
title: Data Binding
page_title: Data Binding
description: "Learn the binding options for the Telerik UI Gantt HtmlHelper for {{ site.framework }}."
previous_url: /helpers/scheduling/gantt/server-binding
slug: htmlhelpers_gantt_binding_aspnetcore
position: 3
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
{% if site.core %}
## Binding in Razor Page scenario

In order to set up the Telerik UI Gantt HtmlHelper for {{ site.framework }} component in Razor page scenario, you need to configure the `Read` , `Create`, `Update` and `Destroy` methods of the `DataSource` and the `DependenciesDataSource` instances. The URL in these methods should refer the name of the handler in the PageModel. In this method, you can also pass additional parameters, such as the antiforgery token (see `forgeryToken`). See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.TaskID).Title("ID").Width(80);
            columns.Bound(c => c.Title).Width(250).Editable(true).Sortable(true);
            columns.Bound(c => c.Start).Width(150).Editable(true).Sortable(true);
            columns.Bound(c => c.End).Width(150).Editable(true).Sortable(true);
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
                m.Field<string>(f=>f.TaskID);
            })
            .Read(r => r.Url("/Gantt/GanttIndex?handler=Read").Data("forgeryToken"))
            .Create(r => r.Url("/Gantt/GanttIndex?handler=Create").Data("forgeryToken"))
            .Update(r => r.Url("/Gantt/GanttIndex?handler=Update").Data("forgeryToken"))
            .Destroy(r => r.Url("/Gantt/GanttIndex?handler=Destroy").Data("forgeryToken"))
        )
        .DependenciesDataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.DependencyID);
                m.PredecessorId(f => f.PredecessorID);
                m.SuccessorId(f => f.SuccessorID);
            })
            .Read(r => r.Url("/Gantt/GanttIndex?handler=DependenciesRead").Data("forgeryToken"))
            .Create(r => r.Url("/Gantt/GanttIndex?handler=DependenciesCreate").Data("forgeryToken"))
            .Update(r => r.Url("/Gantt/GanttIndex?handler=DependenciesUpdate").Data("forgeryToken"))
            .Destroy(r => r.Url("/Gantt/GanttIndex?handler=DependenciesDestroy").Data("forgeryToken"))
        )
    )

    <script>
        function forgeryToken() {
            return kendo.antiForgeryTokens();
        }
    </script>
```
```tab-PageModel(cshtml.cs)
    public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
    {
        return new JsonResult(tasks.ToDataSourceResult(request));
    }

    public JsonResult OnPostCreate([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
    {
        task.TaskID = Guid.NewGuid().ToString();

        if (ModelState.IsValid)
        {
            tasks.Add(task);
        }
        return new JsonResult(new[] { task }.ToDataSourceResult(request, ModelState));
    }

    public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
    {
        int index = tasks.IndexOf(tasks.FirstOrDefault(item => { return item.TaskID == task.TaskID; }));
        tasks[index] = task;

        return new JsonResult(new[] { task }.ToDataSourceResult(request, ModelState));
    }

    public JsonResult OnPostDestroy([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
    {
        int index = tasks.IndexOf(tasks.FirstOrDefault(item => { return item.TaskID == task.TaskID; }));
        tasks.RemoveAt(index);

        return new JsonResult(new[] { task }.ToDataSourceResult(request, ModelState));
    }

    public JsonResult OnPostDependenciesRead([DataSourceRequest] DataSourceRequest request)
    {
        return new JsonResult(dependencies.ToDataSourceResult(request));
    }

    public JsonResult OnPostDependenciesCreate([DataSourceRequest] DataSourceRequest request, DependencyViewModel dependency)
    {
        if (ModelState.IsValid)
        {
            dependencies.Add(dependency);
        }

        return new JsonResult(new[] { dependency }.ToDataSourceResult(request, ModelState));
    }

    public JsonResult OnPostDependenciesUpdate([DataSourceRequest] DataSourceRequest request, DependencyViewModel dependency)
    {
        int index = dependencies.IndexOf(dependencies.FirstOrDefault(item => { return item.DependencyID == dependency.DependencyID; }));
        dependencies[index] = dependency;

        return new JsonResult(new[] { dependency }.ToDataSourceResult(request, ModelState));
    }

    public JsonResult OnPostDependenciesDestroy([DataSourceRequest] DataSourceRequest request, DependencyViewModel dependency)
    {
        int index = dependencies.IndexOf(dependencies.FirstOrDefault(item => { return item.DependencyID == dependency.DependencyID; }));
        dependencies.RemoveAt(index);

        return new JsonResult(new[] { dependency }.ToDataSourceResult(request, ModelState));
    }
```

{% endif %}
## See Also

* [Basic Usage of the Gantt HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
* [Server-Side API](/api/gantt)
