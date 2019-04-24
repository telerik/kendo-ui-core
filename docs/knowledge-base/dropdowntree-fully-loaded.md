---
title: Identify when the DropDownTree is Fully Loaded
description: An example on how to identify when the last DataBound event is fired in the Kendo UI DropDownTree.
type: how-to
page_title: Identify when the DropDownTree is Fully Loaded | Kendo UI DropDownTree
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

How to identify the last DataBound event in the DropDownTree widget? I need to know when the data is fully loaded.

## Solution

To identify the last DataBound event you should implement an event handler for it. In that handler you should use a counter to count the number of items which have children. On each DataBound the counter will be decreased with 1. As a result, all events will be executed when the count becomes 0:

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

* [API Reference of the DropDownTree](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)
