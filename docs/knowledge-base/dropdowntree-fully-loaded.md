---
title: Identify when the DropDownTree is Fully Loaded
description: An example on how to identify when the last DataBound event is fired in the Kendo UI DropDownTree.
type: how-to
page_title: Identify when the DropDownTree is Fully Loaded | Kendo UI DropDownTree for jQuery
slug: dropdowntree-fully-loaded
tags: kendo, kendo-ui, dropdowntree, databound, loaded, last-databound
res_type: kb
component: dropdowntree
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DropDownTree</td>
 </tr>
</table>

## Description

How can I identify the last `DataBound` event in the DropDownTree so that I know when the data is fully loaded?

## Solution

1. To identify the last `DataBound` event, implement an event handler for it.
1. In that handler, use a counter to count the number of items which have children.
1. On each `DataBound` event, the counter will be decreased by one. As a result, all events will be executed when the count becomes zero.

```dojo
<input id="dropdowntree" style="width: 100%;" />

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

  var counter = 0;

  $("#dropdowntree").kendoDropDownTree({
    placeholder: "Select ...",
    dataSource: homogeneous,
    height: "auto",
    dataTextField: "FullName",
    dataBound: function(e) {
      var ddt = e.sender;
      var dataSource = ddt.dataSource;
      var node = e.node;

      if (!node) {
        var children = dataSource.data();

        children.forEach(function(item, index) {
          if (item.hasChildren) {
            counter ++;
          }
        });
      } else {
        var children = ddt.treeview.dataItem(node).children.data();

        children.forEach(function(item, index) {
          if (item.hasChildren) {
            counter ++;
          }
        });

        counter --;
      }

      if (counter === 0) {
        console.log("Fully bound!");
      }
    }
  });
</script>
```

## See Also

* [API Reference of the DropDownTree](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)
