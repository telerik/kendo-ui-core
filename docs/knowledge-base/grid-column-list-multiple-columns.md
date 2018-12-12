---
title: Show Column List in Multiple Columns
description: An example on how to show a column list in multiple columns of the Kendo UI Grid.
type: how-to
page_title: Show Column List in Multiple Columns | Kendo UI Grid
slug: grid-column-list-multiple-columns
tags: grid, column, list, multiple, columns
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
  <td>Created with version 2018.2.221</td>
 </tr>
</table>


## Description

How can I split the column menu into multiple columns in a Grid that renders many columns?

## Solution

Use custom CSS rules.

```dojo
<style>
    ul ul {
        width: 400px;
    }

    li.k-columns-item .k-animation-container li.k-item {
        float: left;
    }

    ul .k-menu-group li {
        width: 50%;
    }
</style>
<div id="grid" style="width: 2000px;"></div>
<script>
    var options = {
        columns: [
            { field: "name" },
            { field: "age" }
        ],
        columnMenu: {
            columns: true
        },
        sortable: true,
        dataSource: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
        ]
    };

    for (var c = 1; c <= 10; c++) {
        options.columns.push({ field: 'col' + c });
    }


    $("#grid").kendoGrid(options);
</script>
```
