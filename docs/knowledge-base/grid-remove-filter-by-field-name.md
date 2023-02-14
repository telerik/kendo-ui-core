---
title: Grid Remove Filter By Field Name
description: "Learn how to remove a specific filter applied to the DataSource of Kendo UI Grid."
type: how-to
page_title: Remove Filter By Field Name - Kendo UI Grid for jQuery
slug: grid-remove-filter-by-field-name
tags: grid, filters, remove, dataSource, toolbar, field, fieldname, filter
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
  <td>2021.2.616</td>
 </tr>
</table>


## Description

I have applied filters to multiple columns, and I want to clear the filters from only one of the columns. How can I achieve this functionality programmatically?

## Solution

Remove the unnecessary filters from the filter array and reapply it to the DataSource.

The following example demonstrates how to implement the suggested approach:

```dojo
 <div id="grid"></div>
    <script type="text/x-kendo-template" id="template">
            <button id="clearFilterButton" class="k-button">Clear Name Filter</button>
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
          filter: {
            logic: "or",
            filters: [
              {field: "name", operator: "eq", value: "Jane"},
              {field: "name", operator: "eq", value: "John"},
              {field: "age", operator: "eq", value: 30},
              {field: "age", operator: "eq", value: 27}
            ]
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

      $("#clearFilterButton").click(function() {
        var gridDataSource = $("#grid").data("kendoGrid").dataSource;
        // Get the filter object.
        let filter = gridDataSource.filter();
        
        // Check if there are any filters applied.
        if(filter) {
          // Get the filter array.
          let filterArray = filter.filters;
          
          // Remove the filters applied to the 'name' field.
          filterArray = filterArray.filter(function(x) {
            return x.field !== "name";
          });
          
          // Reassign the new filterArray to the filter object.
          filter.filters = filterArray;
          // Reapply the filter object to the DataSource.
          gridDataSource.filter(filter);
        }
      });
    </script>
```
