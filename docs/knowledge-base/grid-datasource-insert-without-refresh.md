---
title: Create an Item in the DataSource without Refreshing the Grid
description: Learn how to add an item to the dataSource without refreshing the Kendo UI Grid.
type: how-to
page_title: Insert Items in the DataSource without Rebinding - Kendo UI for jQuery Data Grid
slug: grid-datasource-insert-without-refresh
tags: grid, datasource, insert, change, rebind
ticketid: 1142171
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I prevent the Kendo UI Grid from refreshing when I insert an item in the dataSource?

## Solution

1. Unbind the `change` event handler of the dataSource from the Grid.
1. Insert the item.
1. Bind the `change` event handler of the dataSource to the Grid.

```dojo
<div id="grid"></div>

<script>
    var dataSource = new kendo.data.DataSource({
        schema: {
            model: {
                id: "id"
            }
        }
    });
    dataSource.pushCreate([{
        id: 1,
        name: "John Doe"
    }, {
        id: 4,
        name: "Alex"
    }]);

    var grid = $("#grid").kendoGrid({
        dataSource: dataSource
    }).data("kendoGrid");

    setTimeout(function(e) {
        //prevent the Grid from refreshing upon inserting a row
        dataSource.unbind("change", grid._refreshHandler);
        dataSource.insert(1, {
            id: 2,
            name: "Peter"
        });
        //Bind back the change event handler of the dataSource to the Grid.
        dataSource.bind("change", grid._refreshHandler);
    }, 1000)

    setTimeout(function(e) {
        //this will now refresh the Grid, change is bound
        dataSource.insert(2, {
            id: 3,
            name: "Michael"
        });
    }, 3000)
</script>
```
