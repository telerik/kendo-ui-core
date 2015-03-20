---
title: Prevent dragging nodes to root level
page_title: Prevent dragging nodes to root level
description: Prevent dragging nodes to root level
---

# Prevent dragging nodes to root level

The example below demonstrates how to handle the treeview drag event to prevent nodes from being dragged to the root level of the tree.

#### Example

```html
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
            // treeview already denies this operation
            return;
          } else {
            // whether the action is related to a root node
            var targetsRoot = $(e.dropTarget).parentsUntil(".k-treeview", ".k-item").length == 1;

            // if targeting a root node, and the operation isn't add
            // (this means that the operation is to insert before/after the root,
            //  which will create another root)
            if (targetsRoot && e.statusClass != "add") {
                e.setStatusClass("k-denied");
            }
          }
        }
      });
    </script>
```
