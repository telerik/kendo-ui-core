---
title: Row Reordering
page_title: jQuery Gantt Documentation - Row Reordering
description: "Get started with the jQuery Gantt by Kendo UI and enable its dragging features."
slug: row_reorder_kendoui_gantt
position: 7
---

# Reorder Rows through Click-Move-Click

As of Kendo UI R2 SP1 2023, users can reorder the Gantt's TreeList rows by using the click-move-click functionality provided by the [`clickMoveClick`](/api/javascript/ui/gantt/configuration/editable.clickmoveclick) option. To use this functionality, you must also add a `draggable` column that allows the draggable icon to appear. Once enabled, users can move the row by clicking the icon to start moving the row, and then clicking again to place the row in its new position.

```dojo
    <div id="gantt"></div>
    <script>
        $("#gantt").kendoGantt({
            columns: [
                { draggable: true, width: "40px" },
                "title",
                "start",
                "end"
            ],
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
                }
            ],
            dependencies: [
                {
                predecessorId: 1,
                successorId: 2,
                type: 1
                }
            ],
            editable: {
                clickMoveClick: true
            }
        });
    </script>
```

# Reorder Rows by Dragging and Dropping

You can reorder the Gantt's TreeList rows by using the drag and drop functionality provided by the [`reorder`](/api/javascript/ui/gantt/configuration/editable.reorder) option.

The following example demonstrates how you can reorder the TreeList rows using drag and drop:

```dojo
    <div id="gantt"></div>
    <script>
        $("#gantt").kendoGantt({
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
                }
            ],
            dependencies: [
                {
                predecessorId: 1,
                successorId: 2,
                type: 1
                }
            ],
            editable: {
                reorder: true
            }
        });
    </script>
```

## See Also

* [Gantt JavaScript API Reference](/api/javascript/ui/gantt)
