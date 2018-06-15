---
title: Clear All Filters
description: An example which demonstrates how to programmatically clear all applied filters in a Kendo Grid
type: how-to
page_title: Remove Grid's DataSource Filters | Kendo UI Grid
slug: grid-datasource-filter-clear-all
tags: grid, datasource, filter, clear, all
ticketid: 1167921
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.516</td>
 </tr>
</table>

## Description

I have a Kendo Grid where I would like to clear all filters for all columns.      

## Solution

To remove all filtering from a Kendo UI Grid, use the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter) method to set the Grid's dataSource [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/filter) object as empty. 
```js
    $("#grid").data("kendoGrid").dataSource.filter({});
```

The following demonstrates this using an external Kendo UI Button's [`click`](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/events/click) event:

```html
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="example">
      <input type="button" id="clearFilterButton" class="k-button" value="Clear Filter" />
      <br><br>
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              data: products,
              schema: {
                model: {
                  fields: {
                    ProductName: { type: "string" },
                    UnitPrice: { type: "number" },
                    UnitsInStock: { type: "number" },
                    Discontinued: { type: "boolean" }
                  }
                }
              },
              pageSize: 20
            },
            height: 550,
            scrollable: true,
            sortable: true,
            filterable: {
            	extra: false,
            },
            pageable: {
              input: true,
              numeric: false
            },
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
              { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
              { field: "Discontinued", width: "130px" }
            ]
          });

          $("#clearFilterButton").click(function (){

            /*
            The code below will clear all filters from the
            Kendo Grid's DataSource by replacing it with an empty object.
            */
            $("#grid").data("kendoGrid").dataSource.filter({});
          });
        });
      </script>
    </div>
```

## See Also

* [Kendo Grid Demo - Filter Row.](https://demos.telerik.com/kendo-ui/grid/filter-row)
* [Filterable - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/filterable)
