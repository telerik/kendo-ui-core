---
title: Column Menu
page_title: jQuery Gantt Documentation - Column Menu
description: "Get started with the jQuery Gantt by Kendo UI and learn how to enable its column menu."
slug: columnmenu_kendoui_gantt_widget
position: 8
---

# Column Menu

The Gantt provides a built-in option for triggering column operations through a menu.

To enable the Column Menu implementation, use [`columnMenu:true`](/api/javascript/ui/gantt/configuration/columnmenu). As a result, the column headers of the Gantt's TreeList render a column menu, which allows the user to sort, filter, reorder, or change the visibility of a column. The column menu also detects when a specific column operation is disabled through the column definition and does not render the corresponding UI. For a runnable example, refer to the [demo on configuring the Columns in the Gantt](https://demos.telerik.com/kendo-ui/gantt/columns).

> When the [`columnMenu`](/api/javascript/ui/gantt/configuration/columnmenu) configuration is set to true, the Gantt fires the [`columnMenuInit`](/api/javascript/ui/gantt/events/columnmenuinit) and [`columnMenuOpen`](/api/javascript/ui/gantt/events/columnmenuopen) events instead of [`filterMenuInit`](/api/javascript/ui/gantt/events/filtermenuinit) and [`filterMenuOpen`](/api/javascript/ui/gantt/events/filtermenuopen).

For more information about the available configuration properties, see the [Column Menu API reference](/api/javascript/ui/gantt/configuration/columnmenu).

## Column Reordering

As of Kendo UI R2 SP1 2023, the Gantt TreeList's Column Menu provides an option to change the position of the target column by using **Move next** and **Move previous** buttons.   

```dojo
      <div id="gantt"></div>
        <script>
            $("#gantt").kendoGantt({
                reorderable:true,
                columnMenu: true,
                dataSource: [
                    {
                    id: 1,
                    orderId: 0,
                    parentId: null,
                    title: "Task1",
                    start: new Date("2014/6/17 9:00"),
                    end: new Date("2014/6/17 11:00")
                    },
                    {
                    id: 2,
                    orderId: 1,
                    parentId: null,
                    title: "Task2",
                    start: new Date("2014/6/17 12:00"),
                    end: new Date("2014/6/17 14:00")
                    },
                    {
                    id: 3,
                    orderId: 2,
                    parentId: null,
                    title: "Task3",
                    start: new Date("2014/6/17 13:00"),
                    end: new Date("2014/6/17 15:00")
                    }

                ],
                dependencies: [
                    {
                    predecessorId: 1,
                    successorId: 2,
                    type: 1
                    }
                ],
                columns: [
                    {
                    field: "title",
                    menu: false
                    },
                    {
                    field: "start",
                    title: "Start Time"
                    },
                    {
                    field: "end",
                    title: "End Time"
                    }
                ]
            });
    </script>
```

## See Also

* [JavaScript API Reference of the Gantt](/api/javascript/ui/gantt)
* [Kendo UI Knowledge Base](/knowledge-base)
