---
title: Grid Remove Filters
description: Learn how to remove filters applied to the DataSource of Kendo UI Grid.
type: how-to
page_title: Remove Filters - Kendo UI Grid for jQuery
slug: grid-remove-filters
tags: grid, filters, remove, dataSource, toolbar
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Product Version</td>
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
            <button id="clearFiltersButton" class="k-button">Clear Filters</button>
    </script>
    <script>
      $("#grid").kendoGrid({
        toolbar: kendo.template($("#template").html()),
        columns: [
          { field: "name", filterable: false },
          { field: "age" }
        ],
        dataSource: {
          data: [
          { name: "Jane", age: 30 }, 
          { name: "John", age: 33 },
          { name: "Ana", age: 23 },
          { name: "Bob", age: 27 },
          { name: "Helen", age: 62 },
          { name: "Michaele", age: 54 },
          { name: "Susan", age: 18 },
          { name: "Charlie", age: 71 },
          { name: "Steve", age: 33 },
          ],
          schema: {
            model: {
              fields: {
                age: { type: "number" }
              }
            }
          }
        },
        filterable: {
          operators: {
            number: {
              eq: "Equal to",
              neq: "Not equal to",
              lt: "Less than",
              gt: "Greater than"
            }
          }
        }
      });

      $("#clearFiltersButton").click(function() {
        var gridDataSource = $("#grid").data("kendoGrid").dataSource;
        gridDataSource.filter({});
      });
    </script>
```

To remove only a specific filter from the Grid DataSource, the filter object needs to be removed from the `filters` array.

The following example demonstrates how to clear filter for a specific column only:

```dojo
    <div id="grid"></div>
    <script type="text/x-kendo-template" id="template">
            <button id="clearFiltersButton" class="k-button">Clear Filter for 'name' Column</button>
    </script>
    <script>
      $("#grid").kendoGrid({
        toolbar: kendo.template($("#template").html()),
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { name: "Jane", age: 30 }, 
            { name: "John", age: 33 },
            { name: "Ana", age: 23 },
            { name: "Bob", age: 27 },
            { name: "Helen", age: 62 },
            { name: "Michaele", age: 54 },
            { name: "Susan", age: 18 },
            { name: "Charlie", age: 71 },
            { name: "Steve", age: 33 },
          ],
          schema: {
            model: {
              fields: {
                age: { type: "number" }
              }
            }
          },
          filter: [
            { field: "name", operator: "startswith", value: "Jane" },
            { field: "age", operator: "eq", value: 30 }
          ]
        },
        filterable: {
          operators: {
            number: {
              eq: "Equal to",
              neq: "Not equal to",
              lt: "Less than",
              gt: "Greater than"
            }
          }
        }
      });

      $("#clearFiltersButton").click(function() {
        var gridDataSource = $("#grid").data("kendoGrid").dataSource;
        var currentFilter = gridDataSource.filter() 
        var newResult = currentFilter.filters.filter(({field}) => !field.includes('name'))
        gridDataSource.filter(newResult);
      });
    </script>
```
