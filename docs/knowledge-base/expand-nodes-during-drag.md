---
title: Expand TreeView Nodes while Dragging
page_title: Expand TreeView Nodes while Dragging
description: "Learn how to expand Kendo UI for jQuery TreeView items that are hovered when the user drags a node."
slug: howto_expandnodesduringdrag_treeview
previous_url: /controls/navigation/treeview/how-to/nodes/expand-nodes-during-drag
tags: telerik, kendo, jquery, treeview, expand, nodes, while, during, dragging
component: treeview
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TreeView for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I expand the items that are hovered when the user drags a node in the Kendo UI for jQuery TreeView?

## Solution

The following example demonstrates how to achieve the desired scenario.

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
