---
title: Prevent the Dragging of Nodes to Deep TreeView Levels
page_title: Prevent the Dragging of Nodes to Deep TreeView Levels
description: "Learn how to handle the Kendo UI for jQuery TreeView drag event to prevent nodes from being dragged to a deep level of the tree."
slug: howto_preventdragging_nodestodeeplevels_treeview
previous_url: /controls/navigation/treeview/how-to/nodes/prevent-dragging-to-deep-levels
tags: telerik, kendo, jquery, treeview, prevent, dragging, of, nodes, to, deep, levels
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

How can I prevent the nodes from being dragged to a deeper tree level in the Kendo UI for jQuery TreeView?

## Solution

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
