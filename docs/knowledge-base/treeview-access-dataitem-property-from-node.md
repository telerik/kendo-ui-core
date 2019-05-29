---
title: Access TreeView Node DataItem Property
description: An example demonstrating how to access the ID of the DataItem that corresponds to a TreeView node
type: how-to
page_title: Access Property of DataItem from TreeView Node | Kendo UI TreeView for jQuery
slug: treeview-access-dataitem-property-from-node
tags: treeview, access, dataitem, data, item, property, node, id
ticketid: 1158103
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>TreeView for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.516</td>
 </tr>
</table>

## Description

How can I access the DataItem `ID` value of a TreeView node?

## Solution

To get a property from the model of a specific node, use the [`dataItem` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/methods/dataitem#dataItem) of the TreeView.

The following example demonstrates the full implementation of the suggested approach by displaying an alert with the DataItem `ID` when a node is selected.

```dojo
<div class="demo-section k-content">
  <div id="treeview"></div>
</div>
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

  function onSelect(e) {
    var node = e.node;
    var treeview = $("#treeview").data("kendoTreeView");
    var dataItem = treeview.dataItem(node);
    alert("Employee ID of selected person: " + dataItem.EmployeeId);
  }

  $("#treeview").kendoTreeView({
    dataSource: homogeneous,
    dataTextField: "FullName",
    select: onSelect
  });
</script>
```

## See Also

* [API Reference of the dataItem method](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/methods/dataitem#dataItem)
