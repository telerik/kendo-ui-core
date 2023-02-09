---
title: Check the TreeView Nodes Programmatically
page_title: Check the TreeView Nodes Programmatically
description: "Learn how to check the checkbox of a Kendo UI for jQuery TreeView node programmatically."
previous_url: /web/treeview/how-to/check-nodes-programatically, /controls/navigation/treeview/how-to/binding/check-nodes-programmatically
slug: howto_checknodeprogramatically_treeview
tags: telerik, kendo, jquery, treeview, check, nodes, programmatically
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

How can I show lines between the nodes of the Kendo UI for jQuery TreeView?

## Solution

The following example demonstrates how to programmatically select the checkbox of a TreeView node.

```dojo
  <div id="tree"></div>

  <script>
    $("#tree").kendoTreeView({
      checkboxes: {
        checkChildren: true
      },

      dataSource: {
        data: [
          { text: "Foo", expanded: true, items: [
            { text: "Bar" },
            { text: "Baz" }
          ] }
        ]
      }
    });

    var treeview = $("#tree").data("kendoTreeView");

    var bar = treeview.findByText("Bar");

    treeview.dataItem(bar).set("checked", true);
  </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
