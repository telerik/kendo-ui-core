---
title: Views
page_title: jQuery Gantt Documentation | Views
description: "Get started with the jQuery Gantt by Kendo UI and learn how to initialize the widget and use its events."
slug: views_kendoui_gantt
position: 6
---

# Views

The time-line of the Gantt enables you to display its tasks in different views.

The Gantt supports the following views:

- `day`&mdash;The timeline is divided into separate days and hours.
- `week`&mdash;The timeline is divided into weeks and days.
- `month`&mdash;The timeline is divided into months and weeks.

To enable, disable, or further configure individual views, use the [`views`](/api/web/gantt#configuration-views) option.

The following example demonstrates how to enable all scheduler views.

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      views: [
        "day", // A view configuration can be a string (the view type) or an object (the view configuration).
        { type: "week", selected: true }, // The Week view will appear as initially selected.
        "month"
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
      ],
      dependencies: [
        {
          id: 1,
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ]
    });
    </script>

## See Also

* [Basic Usage of the Gantt (Demo)](https://demos.telerik.com/kendo-ui/gantt/index)
* [Using the API of the Gantt (Demo)](https://demos.telerik.com/kendo-ui/gantt/api)
* [JavaScript API Reference of the Gantt](/api/javascript/ui/gantt)
