---
title: Update the Selected Node in TreeView
description: Learn how to update the text of the selected node in the Kendo UI TreeView.
type: how-to
page_title: Update the Text of the Selected Node in TreeView - Kendo UI TreeView for jQuery
slug: treeview-update-selected-node
tags: treeview, troubleshooting
ticketid: 1556946  
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TreeView for jQuery</td>
 </tr> 
</table>

## Description

How can I update the text of the selected node in Kendo UI for jQuery TreeView?

## Solution

1. Find the [`dataItem`](/api/javascript/ui/treeview/methods/dataitem) of the selected node.
1. Use the [`set`](/api/javascript/data/model/methods/set) method to update the node.

```dojo
    <label>Value: <input id="update-textbox" class="k-textbox" value="abc" /></label>
    <button id="change-text" onclick="changeText()">Change text</button>
    <div id="treeview"></div>

    <script>
      var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
      homogeneous = new kendo.data.HierarchicalDataSource({
        transport: {
          read: {
            url: serviceRoot + "/Employees",
            dataType: "jsonp"
          }
        },
        schema: {
          model: {
            id: "EmployeeId",
            hasChildren: "HasEmployees"
          }
        }
      });

      $("#treeview").kendoTreeView({
        dataSource: homogeneous,
        dataTextField: "FullName"
      });

      function changeText(){
        var tv = $("#treeview").data('kendoTreeView')
        var selected = tv.select();
        var node = tv.dataItem(selected);
        var text = $("#update-textbox").val();
        node.set("FullName", text);
      }
    </script>
```
