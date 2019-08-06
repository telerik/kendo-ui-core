---
title: Show AutoComplete Suggestions for Current Grid Filter
page_title: Show AutoComplete Suggestions for Current Grid Filter | Kendo UI Grid for jQuery
description: "An example on how to filter the Kendo UI Grid by using the Kendo UI AutoComplete and by showing results from the current Grid filter."
previous_url: /controls/data-management/grid/how-to/autocomplete-suggestions-by-current-grid-filter.html, /controls/data-management/grid/how-to/filtering/autocomplete-suggestions-by-current-grid-filter
slug: howto_autocomplete_suggestions_by_current_grid_filter
tags: grid, autocomplete, suggestions, filter
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI AutoComplete</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
</table>

## Description

How can I show AutoComplete suggestions for the current Grid filter in Kendo UI?

## Solution

The AutoComplete filter of the Grid is bound to the whole data source of the Grid widget. However, it is possible to show the AutoComplete results only for the current filter of the Grid.

1. Handle the [`dataBound` event of the Grid](/api/javascript/ui/grid/events/databound).
1. Get the [data source filter of the Grid](/api/javascript/data/datasource/methods/filter) in the dataBound handler and set it as a filter to the AutoComplete data source.

The following example demonstrates how to use the AutoComplete for filtering and consider the current filter of the Grid.

```dojo
    <div id="grid"></div>
    <script>
    function filterAutoCompleteDataSource(e) {
      var gridFilter = e.sender.dataSource.filter();
      e.sender.element.find(".k-autocomplete input").data("kendoAutoComplete").dataSource.filter(gridFilter);
    }

    $(document).ready(function () {
      $("#grid").kendoGrid({
        dataSource : {
          type : "odata",
          transport : {
            read : "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
          },
          schema : {
            model : {
              fields : {
                OrderID : {
                  type : "number"
                },
                Freight : {
                  type : "number"
                },
                ShipName : {
                  type : "string"
                },
                OrderDate : {
                  type : "date"
                },
                ShipCity : {
                  type : "string"
                }
              }
            }
          },
          pageSize : 20,
          serverPaging : true,
          serverFiltering : true,
        },
        dataBound : filterAutoCompleteDataSource,
        height : 550,
        filterable : {
          mode : "row"
        },
        pageable : true,
        columns :
        [{
            field : "OrderID",
            width : 225,
            filterable : {
              cell : {
                showOperators : false
              }
            }
          }, {
            field : "ShipName",
            width : 500,
            title : "Ship Name",
            filterable : {
              cell : {
                operator : "contains"
              }
            }
          }, {
            field : "Freight",
            width : 255,
            filterable : {
              cell : {
                operator : "gte"
              }
            }
          }, {
            field : "OrderDate",
            title : "Order Date",
            format : "{0:MM/dd/yyyy}"
          }
        ]
      });
    });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)
