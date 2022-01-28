---
title: Implement Excel-Like Filter Menus
page_title: AutoComplete for Current Filter | Kendo UI Grid for jQuery
description: "Learn how to filter the jQuery Grid by Kendo UI by using AutoComplete and by showing results from the current Grid filter."
previous_url: /controls/data-management/grid/how-to/filtering/grid-with-excel-like-filter
slug: howto_gridfiltering_excellike_grid
tags: grid, similar, excel, filter, menus, using, autocomplete, showing, results, current, filtering
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I filter the jQuery Grid by Kendo UI by using AutoComplete and by showing results from the current Grid filter?

## Solution

The following example demonstrates how to set the Grid with an Excel-like filter that has sorted and unique items.

To set a single Data Source for all filter menus, the example uses the [`columns.filterable.dataSource`](/api/javascript/ui/grid/configuration/columns.filterable.datasource) property of the Grid.

To observe this behavior:

1. Filter the **Product Name** column.
2. Open the **Unit Price** column. Note that the values are filtered based on the currently applied filter on the **Product Name** column.

```dojo
   <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {

          function removeDuplicates(items, field) {
            var getter = function(item){return item[field]},
                result = [],
                index = 0,
                seen = {};

            while (index < items.length) {
              var item = items[index++],
                  text = getter(item);

              if(text !== undefined && text !== null && !seen.hasOwnProperty(text)){
                result.push(item);
                seen[text] = true;
              }
            }

            return result;
          }

          var filterSource = new kendo.data.DataSource({
            data: products
          });

          $("#grid").kendoGrid({
            dataSource: {
              data: products,
              schema: {
                model: {
                  fields: {
                    ProductName: { type: "string"},
                    UnitPrice: { type: "number" },
                    UnitsInStock: { type: "number" },
                    Discontinued: { type: "boolean" }
                  }
                }
              },
              pageSize: 20,
              change: function(e) {
                filterSource.data(e.items);
              },
            },
            height: 550,
            scrollable: true,
            sortable: true,
            pageable: {
              input: true,
              numeric: false
            },
            filterable: true,
            filterMenuInit: function (e){
              var grid = e.sender;
              e.container.data("kendoPopup").bind("open", function() {
                filterSource.sort({field: e.field, dir: "asc"});
                var uniqueDsResult = removeDuplicates(grid.dataSource.view(), e.field);
                filterSource.data(uniqueDsResult);
              })
            },
            columns: [
              {field: "ProductName", filterable: {
                multi: true,
                dataSource: filterSource
              }
              },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px",filterable: {
                multi: true,
                dataSource: filterSource
              } },
              { field: "UnitsInStock", title: "Units In Stock", width: "130px",filterable: {
                multi: true,
                dataSource: filterSource
              } },
              { field: "Discontinued", width: "130px"}
            ]
          });
        });
      </script>
    </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
