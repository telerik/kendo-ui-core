---
title: Dragging and Dropping
page_title: jQuery TreeView Documentation - Dragging and Dropping
description: "Get started with the jQuery TreeView by Kendo UI and implement the drag-and-drop functionality of the widget."
slug: dragdrop_kendoui_treeview
position: 3
---
# Node Click-Move-Click

As of Kendo UI R2 SP1 2023, users can reorder the TreeView's nodes by using the click-move-click functionality provided by the [`clickMoveClick``](/api/javascript/ui/treeview/configuration/dragandrop.clickmoveclick) option. To start moving the node, users can click on it, and then click again to place the node in its new position.

```dojo
    <div id="treeview"></div>
    <script>
        $("#treeview").kendoTreeView({
            dragAndDrop: {
                clickMoveClick: true
            },
            dataSource: [
                { text: "Item 1", items: [
                { text: "Sub Item 1" },
                { text: "Sub Item 2" },
                ] },
                { text: "Item 2" }
            ]
        });
    </script>
```
# Dragging and Dropping

When the drag-and-drop feature is enabled, the nodes of the TreeView can be dragged and dropped across all levels.

The functionality also features tooltips that help users indicate where the node will be dropped.

The following example demonstrates how to enable the drag-and-drop functionality for the TreeView nodes.

    $("#treeView").kendoTreeView({
        dragAndDrop: true
    });

## See Also

* [Dragging and Dropping in the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/dragdrop)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
