---
title: Grid Remove Filters
description: An example on how to remove filters applied to the DataSource of Kendo UI Grid.
type: how-to
page_title: Remove Filters | Kendo UI Grid for jQuery
slug: grid-remove-filters
tags: grid, filters, remove, dataSource, toolbar
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Made with version</td>
  <td>2021.1.119</td>
 </tr>
</table>


## Description

How can I add a toolbar button for removing the applied filters to the Grid?

## Solution

The filter condition is applied to the DataSource. In order to remove the current filters, apply an empty object as a filter to the DataSource.

The following example demonstrates how to implement the suggested approach:

```dojo
    <div id="grid"></div>
    <script type="text/x-kendo-template" id="template">
            <button id="clearFiltersButton">Clear Filters</button>
    </script>
    <script>
      $("#grid").kendoGrid({
        toolbar: kendo.template($("#template").html()),
        columns: [
          { field: "name", filterable: false },
          { field: "age" }
        ],
        filterable: true,
        dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
      });

      $( "#clearFiltersButton" ).click(function() {
        var gridDataSource = $("#grid").data("kendoGrid").dataSource;
        gridDataSource.filter({});
      });

    </script>
```
