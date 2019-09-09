---
title: Columns
page_title: Columns | Telerik UI Gantt HtmlHelper for ASP.NET Core
description: "Configure the columns of the Telerik UI Gantt HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_gantt_columns_aspnetcore
position: 3
---

# Columns

The columns in the TreeList section of the Gantt can be individually configured. The following configuration options are supported:

* `Title` - the header text of the column.
* `Sortable` - whether the column can be sorted, or not.
* `Editable` - whether the column can be edited, or not.
* `Width` - the width of the column.
* `Format` - the format in which the data in the column is represented.

The example below demonstrates how to configure Gantt columns.

```
    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.TaskID).Title("ID").Width(50);
            columns.Bound(c => c.Title).Editable(true).Sortable(true);
            columns.Bound(c => c.Start).Width(100).Editable(true).Sortable(true);
            columns.Bound(c => c.End).Width(100).Editable(true).Sortable(true);
        })
        .Resizable(true)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.MonthView();
        })
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.ParentId(f => f.ParentID);
                m.Field(f => f.Expanded).DefaultValue(true);
            })
            .Read("ReadTasks", "Gantt")
            .Destroy("DestroyTask", "Gantt")
            .Update(update => update.Action("UpdateTask", "Gantt").Data("onUpdateCreate"))
            .Create(create => create.Action("CreateTask", "Gantt").Data("onUpdateCreate"))
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

    <script>
        // Send the dates for the newly creted/updated tasks as UTC strings
        function onUpdateCreate(e) {
            e.End = e.End.toISOString();
            e.Start = e.Start.toISOString();
        }
    </script>
```

## Column Resizing

The columns in the TreeList section of the Gantt can be resized by clicking on the drag handles between the columns and dragging with the mouse. To enable this behavior, use the `.Resizable(true)` configuration option of the Gantt.

## See  Also

* [Server-Side API](/api/scheduler)
