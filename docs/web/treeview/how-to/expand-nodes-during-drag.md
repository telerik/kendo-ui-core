---
title: Expand nodes during drag
page_title: Expand nodes during drag
description: Expand nodes during drag
---

# Expand nodes during drag

The example below demonstrates how to expand treeview items that are hovered when the user drags a node.

#### Example:

```html
    <div id="treeview"></div>

    <script>
      $("#treeview").kendoTreeView({
        dragAndDrop: true,
        dataSource: [
          { text: "foo", items: [
            { text: "bar" },
            { text: "baz" }
          ] },
          { text: "qux", items: [
            { text: "cat" },
            { text: "dog" }
          ] }
        ],

        drag: function(e) {
            var dataItem = this.dataItem(e.dropTarget);
            if (dataItem) {
                dataItem.set("expanded", true);
            }
        }
      });
    </script>
```
