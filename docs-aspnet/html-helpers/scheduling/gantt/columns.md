---
title: Columns
page_title: Columns
description: "Configure the columns of the Telerik UI Gantt HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_gantt_columns_aspnetcore
position: 4
---

# Columns

The columns in the TreeList section of the Gantt can be individually configured. The following configuration options are supported:

- `Bound`&mdash;Binds the task to the specified model field.
- `Columns`&mdash;The columns which will be rendered as child columns under this group column header.
- `Editor`&mdash;Provides a way to specify a custom editing UI for the column.
- `Editable`&mdash;Indicates if the column can be edited.
- `Expandable`&mdash;If set to `true`, the column will show the icons that are used for expanding and collapsing child rows. By default, the first column of the TreeList is expandable.
- `Field`&mdash;The field from the task model which will be used to populate the column.
- `Filterable`&mdash;If set to `true` and if filtering is enabled, a filter menu will be displayed for this column. If set to `false`, the filter menu will not be displayed. By default, a filter menu is displayed for all columns when filtering is enabled through the filterable option.
- `Filterable.Ui`&mdash;The `role` data attribute of the widget that is used in the filter menu, or a JavaScript function which initializes that widget.
- `Format`&mdash;The format in which the data in the column is represented.
- `HeaderAttributes`&mdash;The HTML attributes of the table header cell (`th`) that is rendered for the column.
- `HeaderTemplate`&mdash;The template which renders the column header content. By default, the value of the title column option is displayed in the column header cell.
- `HeaderTemplateId`&mdash;The id of the header template.
- `Hidden`&mdash;If set to `true`, the Gantt will not display the column. By default, all columns are displayed.
- `HtmlAttributes`&mdash;The HTML attributes of the table cell (`td`) that is rendered for the column.
- `Menu`&mdash;If set to `true`, the Gantt will display the column in the column menu. By default, the column menu includes all data-bound columns.
- `MinScreenWidth`&mdash;The pixel screen width below which the column will be hidden. The setting takes precedence over the hidden setting and the two cannot not be used at the same time.
- `Sortable`&mdash;Indicates if the column can be sorted. If set to `true` and sorting is enabled, the user can click the column header and sort the treelist by the column field. If set to `false`, sorting will be disabled for this column. By default, all columns are sortable if sorting is enabled though the sortable option.
- `Sortable.Compare`&mdash;A JavaScript function for comparing the values.
- `Template`&mdash;The template which renders the column content. The Gantt renders table rows (`tr`) which represent the data source items. Each table row consists of table cells (`td`) which represent the treelist columns. By default, the HTML-encoded value of the field is displayed in the column.
- `TemplateId`&mdash;The id of the column template.
- `Title`&mdash;The header text of the column.
- `Width`&mdash;The width of the column.

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

## See Also

* [Server-Side API](/api/scheduler)
