---
title: Columns
page_title: jQuery Gantt Documentation | Columns
description: "Get started with the jQuery Gantt by Kendo UI and individually configure its columns."
slug: columns_kendoui_gantt
position: 4
---

# Columns

The Gantt provides options for individual configuration of the columns in its tree-list section.

The Gantt supports the following configuration options:

- `attributes`&mdash;The HTML attributes of the table cell (`td`) that is rendered for the column.
- `columns`&mdash;The columns which will be rendered as child columns under this group column header.
- `editor`&mdash;Provides a way to specify a custom editing UI for the column.
- `editable`&mdash;Indicates if the column can be edited.
- `expandable`&mdash;If set to `true`, the column will show the icons that are used for expanding and collapsing child rows. By default, the first column of the TreeList is expandable.
- `field`&mdash;The field from the task model which will be used to populate the column.
- `filterable`&mdash;If set to `true` and if filtering is enabled, a filter menu will be displayed for this column. If set to `false`, the filter menu will not be displayed. By default, a filter menu is displayed for all columns when filtering is enabled through the filterable option.
- `filterable.ui`&mdash;The `role` data attribute of the widget that is used in the filter menu, or a JavaScript function which initializes that widget.
- `format`&mdash;The format in which the data in the column is represented.
- `headerAttributes`&mdash;The HTML attributes of the table header cell (`th`) that is rendered for the column.
- `headerTemplate`&mdash;The template which renders the column header content. By default, the value of the title column option is displayed in the column header cell.
- `hidden`&mdash;If set to `true`, the Gantt will not display the column. By default, all columns are displayed.
- `menu`&mdash;If set to `true`, the Gantt will display the column in the column menu. By default, the column menu includes all data-bound columns, that is, the ones with a set `field` option.
- `minScreenWidth`&mdash;The pixel screen width below which the column will be hidden. The setting takes precedence over the hidden setting and the two cannot not be used at the same time.
- `sortable`&mdash;Indicates if the column can be sorted. If set to `true` and sorting is enabled, the user can click the column header and sort the treelist by the column field. If set to `false`, sorting will be disabled for this column. By default, all columns are sortable if sorting is enabled though the sortable option.
- `sortable.compare`&mdash;A JavaScript function for comparing the values.
- `template`&mdash;The template which renders the column content. The Gantt renders table rows (`tr`) which represent the data source items. Each table row consists of table cells (`td`) which represent the treelist columns. By default, the HTML-encoded value of the field is displayed in the column.
- `title`&mdash;The header text of the column.
- `width`&mdash;The width of the column.

To configure individual columns, use the [`columns`](/api/web/gantt#configuration-columns) option.

The following example demonstrates how to configure Gantt columns.

    <div id="gantt"></div>
    <script>      
    $("#gantt").kendoGantt({
      columns: [
        { field: "id", title: "ID", sortable: true, editable: false, width: 30 },
        { field: "title", title: "Title", sortable: true, editable: true, width: 150 },
        { field: "start", title: "Start Time", sortable: true, editable: true, format: "{0:MM/dd/yyyy HH:mm}", width: 100 },
        { field: "end", title: "End Time", sortable: true, editable: true, format: "{0:MM/dd/yyyy HH:mm}", width: 100 }
      ],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 13:00")
        }
      ]
    });
    </script>

## See Also

* [Basic Usage of the Gantt (Demo)](https://demos.telerik.com/kendo-ui/gantt/index)
* [Using the API of the Gantt (Demo)](https://demos.telerik.com/kendo-ui/gantt/api)
* [JavaScript API Reference of the Gantt](/api/javascript/ui/gantt)
