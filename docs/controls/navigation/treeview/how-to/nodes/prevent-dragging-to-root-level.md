---
title: Prevent Dragging Nodes to Root Level
page_title: Prevent Dragging Nodes to Root Level | Kendo UI TreeView
description: "Learn how to handle the Kendo UI TreeView drag event to prevent nodes from being dragged to the root level of the tree."
slug: howto_preventdragging_nodestorootlevel_treeview
---

# Prevent Dragging Nodes to Root Level

Your project might require you to prevent the TreeView nodes from being dragged to the root level of the tree.

The following example demonstrates how to handle the `drag` event to achieve this behavior.

```dojo
    <div id="tree"></div>

    <script>
      $("#tree").kendoTreeView({
        dragAndDrop: true,
        dataSource: [
          { text: "root 1", expanded: true, items: [
            { text: "bar", expanded: true, items: [
              { text: "baz" },
              { text: "foo" }
            ] }
          ] },
          { text: "root 2" }
        ],
        drag: function(e) {
          if (e.statusClass == "denied") {
            // The TreeView already denies this operation.
            return;
          } else {
            // Whether the action is related to a root node.
            var targetsRoot = $(e.dropTarget).parentsUntil(".k-treeview", ".k-item").length == 1;

            // If targeting a root node and the operation is not add.
            // This means that the operation is to insert before or after the root
            //  which will create another root.
            if (targetsRoot && e.statusClass != "add") {
                e.setStatusClass("k-denied");
            }
          }
        }
      });
    </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
