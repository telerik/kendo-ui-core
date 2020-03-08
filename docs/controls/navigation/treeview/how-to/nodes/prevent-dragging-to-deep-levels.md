---
title: Prevent Dragging Nodes to Deep Levels
page_title: Prevent Dragging Nodes to Deep Levels | Kendo UI TreeView
description: "Learn how to handle the Kendo UI TreeView drag event to prevent nodes from being dragged to a deep level of the tree."
slug: howto_preventdragging_nodestodeeplevels_treeview
---

# Prevent Dragging Nodes to Deep Levels

Your project might require you to prevent the TreeView nodes from being dragged to a deeper level of the tree.

The following example demonstrates how to handle the `drag` event to achieve this behavior.

```dojo
    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", expanded: true, items: [
          { text: "bar", expanded: true, items: [
            { text: "baz", expanded: true, items: [
              { text: "qux" },
              { text: "cat" },
              { text: "dog" }
            ] }
          ] }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    treeview.bind("drag", function(e) {
      // If the current status is "add", then the node will be appended.
      if (e.statusClass == "add") {
        var destination = this.dataItem(e.dropTarget);

        // If the (zero-based) destination level is 3,
        // allowing the operation will result in a 5-level tree..
        if (destination.level() == 3) {
          // Deny the operation.
          e.setStatusClass("k-denied");
        }
      }
    });
    </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
