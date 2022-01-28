---
title: Get all the Groups and SubGroups in Grid
description: An example on how to loop and obtain all the groups in a grid grouped by multiple fields in the Kendo UI Grid.
type: how-to
page_title: Iterate over all Groups | Kendo UI Grid for jQuery
slug: grid-loop-all-groups
tags: grid, group, loop, iterate, obtain, get, all, multiple, nested, subgroups
ticketid: 1160159
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with 2018.1.221 version</td>
 </tr>
</table>

## Description

In our requirement, we want the count of rows of grid based on group by multiple fields in the datasource.

## Solution

1. To search for the subgroups of the Kendo UI Data Source till they have no more subGroups you can use any search algorithm of your choice. For example, you could utilize a function which is publically available in the `kendo.data.js` file and use the callback func to count the subgroups:

    ```
        function eachGroupItems(data, func) {
            for (var idx = 0, length = data.length; idx < length; idx++) {
               if (data[idx].hasSubgroups) {
                   if (eachGroupItems(data[idx].items, func)) {
                       return true;
                   }
               } else if (func(data[idx].items, data[idx])) {
                   return true;
               }
            }
        }
    ```
1. I suggest you do that in the `dataBound` event of the grid, for example:

    ```
        dataBound: function(e){
            var view = this.dataSource.view();
            if(this.dataSource.group()){
              var count = 0;
              eachGroupItems(view, function(items, index){
                count++
              });
              console.log(count);
            }
        }
    ```

```dojo
<div id="grid"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [
          { name: "name1", Location: "ckm", Supplier: "sup1" },
          { name: "name2", Location: "ckm", Supplier: "sup1" },
          { name: "name3", Location: "ckm", Supplier: "sup2" },
          { name: "name4", Location: "hok", Supplier: "sup3" },
          { name: "name5", Location: "hof", Supplier: "sup2" }
        ],
        group: [
          { field: "Location" },
          { field: "Supplier" }
        ]
      });
      $("#grid").kendoGrid({
        dataSource:dataSource,
        columns:["name", "Location", "Supplier"],
        groupable:true,
        dataBound: function(e){
          var view = this.dataSource.view();
          if(this.dataSource.group()){
            var count = 0;
            eachGroupItems(view, function(items, index){
              count++
            });
            console.log(count);
          }
        }
      });
      
      function eachGroupItems(data, func) {
        for (var idx = 0, length = data.length; idx < length; idx++) {
          if (data[idx].hasSubgroups) {
            if (eachGroupItems(data[idx].items, func)) {             
              return true;
            }
          } else if (func(data[idx].items, data[idx])) {
            return true;
          }
        }
      }
    </script>
```
