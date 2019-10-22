---
title: Columns
page_title: jQuery Gantt Documentation | Columns | Kendo UI
description: "Get started with the jQuery Gantt by Kendo UI and individually configure its columns."
slug: columns_kendoui_gantt
position: 3
---

# Columns

The Gantt provides options for individual configuration of the columns in its tree-list section.

The Gantt supports the following configuration options:

- `field`&mdash;The field from the task model which will be used to populate the column.
- `title`&mdash;The header text of the column.
- `sortable`&mdash;Indicates if the column can be sorted.
- `editable`&mdash;Indicates if the column can be edited.
- `width`&mdash;The width of the column.
- `format`&mdash;The format in which the data in the column is represented.

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
