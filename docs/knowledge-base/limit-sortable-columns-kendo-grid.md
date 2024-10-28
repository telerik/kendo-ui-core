---
title: Limiting Sortable Columns in Kendo UI Grid
description: Learn how to restrict the number of sortable columns in a Kendo UI Grid after reaching a specified limit.
type: how-to
page_title: How to Restrict Sortable Columns in a Kendo UI Grid
slug: limit-sortable-columns-kendo-grid
tags: kendo-ui, grid, sortable, columns, restriction
res_type: kb
ticketid: 1668366
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Sortable for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2021.2.616</td>
</tr>
</tbody>
</table>

## Description

When working with a Kendo UI Grid that contains multiple columns, a requirement might arise to limit the number of columns that can be sorted to a specific number, such as eight. After reaching this limit, the remaining columns should not offer the option to sort. This is particularly useful in scenarios involving dynamic columns where the specific columns to be sorted cannot be predetermined.

This KB article also answers the following questions:
- How to dynamically control sortable columns in a Kendo UI Grid?
- How to limit the number of columns that can be sorted in a Grid?
- How to disable sorting on additional columns after reaching a sorting limit?

## Solution

To limit the number of sortable columns in a Kendo UI Grid, you can leverage the `sort` event of the Grid. In the event handler, check the number of columns currently sorted and disable sorting on all other columns if the limit is reached. Here's a step-by-step guide:

1. Subscribe to the Grid's `sort` event.

2. In the event handler, count the currently sorted columns.

3. If the number of sorted columns reaches the limit (e.g., three), prevent the sort event.

Here's an example implementation:

```javascript
$("#grid").kendoGrid({ 
    // other Grid configurations
    sort:function(e){   

              if(sortedColumns.length === 3 && !sortedColumns.includes(e.sort.field)){
                e.preventDefault();
              } else {
                if(e.sort.dir === undefined){ 
                  const index = sortedColumns.indexOf(e.sort.field);
                  // only splice array when item is found
                  sortedColumns.splice(index, 1); 
                } else if (sortedColumns.indexOf(e.sort.field) === -1){

                  sortedColumns.push(e.sort.field); 
                }
              }
            },
});

```

Note: This solution assumes that your columns are defined with a `field` property, which is used to identify columns in the sorting array.

Below you will find a runnable example to try it out:

```dojo
<div id="grid"></div>
      <script>
        $(document).ready(function () {
          var sortedColumns = [];
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read: {
                    url: crudServiceBaseUrl + "/detailproducts",
                    dataType: "jsonp"
                  },
                  update: {
                    url: crudServiceBaseUrl + "/detailproducts/Update",
                    dataType: "jsonp"
                  },
                  destroy: {
                    url: crudServiceBaseUrl + "/detailproducts/Destroy",
                    dataType: "jsonp"
                  },
                  parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                      return { models: kendo.stringify(options.models) };
                    }
                  }
                },
                batch: true,
                pageSize: 20,
                autoSync: true,
               
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      Discontinued: { type: "boolean", editable: false },
                      TotalSales: { type: "number", editable: false },
                      TargetSales: { type: "number", editable: false },
                      LastSupply: { type: "date" },
                      UnitPrice: { type: "number" },
                      UnitsInStock: { type: "number" },
                    
                    }
                  }
                }
              });

          $("#grid").kendoGrid({
            dataSource: dataSource, 
            height: 680, 
            sort:function(e){   

              if(sortedColumns.length === 3 && !sortedColumns.includes(e.sort.field)){
                e.preventDefault();
              } else {
                if(e.sort.dir === undefined){ 
                  const index = sortedColumns.indexOf(e.sort.field);
                  // only splice array when item is found
                  sortedColumns.splice(index, 1); 
                } else if (sortedColumns.indexOf(e.sort.field) === -1){

                  sortedColumns.push(e.sort.field); 

                }
              }
            },
            pageable: true,
            sortable: {
              mode:"multiple"
            },

            columns: [{
              field: "ProductName",
              title: "Product Name",
              width: 300
            }, {
              field: "UnitPrice",
              title: "Price",
              format: "{0:c}",
              width: 105
            }, {
              field: "Discontinued",
              title: "In Stock",            
              width: 130,
            }, {
              field: "UnitsInStock",
              title: "Units",
              width: 105
            }, {
              field: "TotalSales",
              title: "Total Sales",
              format: "{0:c}",
              width: 140,
            }, {
              field: "TargetSales",
              title: "Target Sales",
              format: "{0:c}",
              width: 220
            }]
          });
        });
      </script>
```

## See Also

- [Grid Sortable Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/sortable)
- [Grid API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [Grid Events Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/sort)
