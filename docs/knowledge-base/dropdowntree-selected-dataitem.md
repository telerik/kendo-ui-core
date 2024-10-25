---
title: How To Get the DataItem of the Selected Node in DropDownTree
description: "Learn how to retrieve the dataItem of the selected node in Kendo UI DropDownTree."
type: how-to
page_title: Get Selected DataItem - Kendo UI DropDownTree for jQuery
slug: dropdowntree-selected-dataitem
tags: dropdowntree, treeview, selected, dataitem
ticketid: 1554596
res_type: kb
component: dropdowntree
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DropDownTree for jQuery</td>
 </tr>
</table>

## Description

How can I retrieve the dataItem of the selected node in Kendo UI for jQuery DropDownTree?

## Solution

1. Handle the [`select`](/api/javascript/ui/dropdowntree/events/select) event of the DropDownTree.
1. In the event handler you can access the embedded TreeView.
1. Then, you can use the TreeView [`dataItem`](/api/javascript/ui/treeview/methods/dataitem) method.

```dojo
    <input id="dropdowntree"/>
    <script>
      var dataSource = new kendo.data.HierarchicalDataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/Employees",
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

      $("#dropdowntree").kendoDropDownTree({
        dataSource: dataSource,
        dataTextField: "FullName",
        dataValueField: "EmployeeId",
        select: function(e) {
          var treeview = e.sender.treeview;
          // the result can be observed in the browser`s console (F12)
          console.log(treeview.dataItem(e.node));
        }
      });
    </script>
```

## See Also

* [DropDownTree API Reference](/api/javascript/ui/dropdowntree)
