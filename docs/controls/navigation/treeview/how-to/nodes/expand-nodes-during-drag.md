---
title: Expand Nodes during Drag
page_title: Expand Nodes during Drag | Kendo UI TreeView
description: "Learn how to expand Kendo UI TreeView items that are hovered when the user drags a node."
slug: howto_expandnodesduringdrag_treeview
---

# Expand Nodes during Drag

The following example demonstrates how to expand the TreeView items that are hovered when the user drags a node.

```dojo
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

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
