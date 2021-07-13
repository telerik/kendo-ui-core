---
title: Planned vs Actual
page_title: Data Binding
description: "Learn more about how the Telerik UI Gantt HtmlHelper for {{ site.framework }} displays planned and actual dates."
slug: htmlhelpers_gantt_planned_vs_actual_aspnetcore
position: 4
---

# Planned vs Actual

The `Planned vs Actual` functionality of the Gantt allows you to compare actual `start` and `end` dates to originaly planned dates. If the actual completion date of a task matches the planned end time date, the default task appearance is used. In the scenarios listed below, when there is a difference between an actual and a planned date, the Gantt visualizes it by changing the appearance of the task:

* The actual `end` date of the task is before the planned `end` date - the task is colored green.
* The actual `end` date of the task is after the planned `end` date - a hatched bar that marks the delay is rendered in the task. 
* The actual `start` date of the task is after the planned `end` date - the task is colored red.

For a full example of the Planned vs Actual functionality, refer to the [Planned vs Actual (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/planned-vs-actual).

## Configuration

The example below demonstrates how to configure the Gantt to display planned and actual dates.

```
@(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
    .Name("gantt")
    .Columns(columns =>
    {
        columns.Bound(c => c.Title).Title("Task").Editable(true).Sortable(true).Width(200);
        columns.Bound(c => c.Start).Title("Actual Start Date").Format("{0:M/d/yyyy}").Width(85);
        columns.Bound(c => c.End).Title("Actual End Date").Format("{0:M/d/yyyy}").Width(85);
        columns.Bound(c => c.PlannedStart).Title("Planned Start Date").Format("{0:M/d/yyyy}").Width(85);
        columns.Bound(c => c.PlannedEnd).Title("Planned End Date").Format("{0:M/d/yyyy}").Width(85);
    })
    .Views(views =>
    {
        views.DayView();
        views.WeekView(weekView => weekView.Selected(true));
        views.MonthView();
    })
    .ShowPlannedTasks(true)
    .Toolbar(t => t.Add().Name("plannedTasks"))
    .Editable(e => e.PlannedTasks(true))
    .Resizable(true)
    .Snap(false)
    .DataSource(d => d
        .Model(m =>
        {
            m.Id(f => f.TaskID);
            m.ParentId(f => f.ParentID);
            m.OrderId(f => f.OrderId);
            m.Field(f => f.Expanded).DefaultValue(true);
            m.Field(f => f.PlannedStart);
            m.Field(f => f.PlannedEnd);
        })
        .Read("Planned_Vs_Actual_Read_Tasks", "Gantt")
    )
    .DependenciesDataSource(d => d
        .Model(m =>
        {
            m.Id(f => f.DependencyID);
            m.PredecessorId(f => f.PredecessorID);
            m.SuccessorId(f => f.SuccessorID);
            m.Type(f => f.Type);
        })
        .Read("Planned_Vs_Actual_Read_Dependencies", "Gantt")
        .Create("Planned_Vs_Actual_Create_Dependency", "Gantt")
        .Destroy("Planned_Vs_Actual_Destroy_Dependency", "Gantt")
    )
)
```

The `plannedTasks` tool set in the `Toolbar` configuration enables a switch in the toolbar of the Gantt that allows toggling the `Planned vs Actual` functionality. 

The `ShowPlannedTasks` configuration controls whether planned dates will be shown initially.

Through the `Editable` configuration, you can allow or prevent editing of planned tasks.

## See Also

* [Planned vs Actual (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/planned-vs-actual)
* [Using the API of the Gantt HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/api)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
