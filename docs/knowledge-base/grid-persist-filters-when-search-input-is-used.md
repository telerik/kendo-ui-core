---
title: Combine Search Filters with Menu Filters in the Grid
page_title: Combine Search Filters with Menu Filters in the Grid
description: "An example showcasing how to combine the search input and filter menu filters in the Kendo UI Grid."
type: how-to
slug: grid-persist-filters-when-search-input-is-used
tags: telerik, kendoui, kendo, grid, search, panel, combine, menu, persist, filters, searching
res_type: kb
components: ["grid"]
ticketid: 1552584
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
  <td>Created with version</td>
  <td>2022.1.412</td>
 </tr>
</table>

## Description

Any time I type something in the search panel, the filters that were already applied to the Grid are removed. I want to apply filters through the filter menu of the Grid and, then, use the search panel to find values among the already filtered Grid. How can I persist the filter menu filters while using the search panel?

## Solution

To achieve the desired scenario: 

1. Remove the default event handler that is applied to the search panel input.
1. Attach a custom event handler to the input.
1. Extend the default search logic by creating an array that will store both the default and search filters.
1. If there are any search filters, push the search expression to the combined array.
1. If there are other Grid filters, push the rest of them to the array.
1. Filter the data source of the Grid with the combined array by using the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter) method.

The following example demonstrates the full implementation of the approach.

```dojo
    <div id="grid"></div>
    <script>
      $(document).ready(function () {
        $("#grid").kendoGrid({
          dataSource: {
            type: "odata-v4",
            transport: {
              read: "https://demos.telerik.com/service/v2/odata/Orders"
            },
            schema: {
              model: {
                fields: {
                  OrderID: { type: "number" },
                  Freight: { type: "number" },
                  ShipName: { type: "string" },
                  OrderDate: { type: "date" },
                  ShipCity: { type: "string" }
                }
              }
            },
            pageSize: 20,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            filter: [{field: "Freight", operator: "gte", value: 32}]
          },
          filterable: true,
          pageable: true,
          height: 550,
          sortable: {
            mode: "mixed",
            allowUnsort: true,
            showIndexes: true
          },
          toolbar: ["search"],
          search: {
            fields: [
              { name: "OrderID", operator: "eq" },
              { name: "Freight", operator: "gte" },
              { name: "ShipName", operator: "contains" },
              { name: "ShipCity", operator: "contains" },
            ]
          },
          columns: [
            {
              field: "OrderID",
              title: "Order ID",
            },
            "Freight",
            {
              field: "OrderDate",
              title: "Order Date",
              format: "{0:MM/dd/yyyy}"
            }, {
              field: "ShipName",
              title: "Ship Name"
            }, {
              field: "ShipCity",
              title: "Ship City"
            }
          ]
        });

        let grid = $("#grid").data("kendoGrid");

        // Remove the default event handler that is attached to the search input and add a custom one.
        grid.wrapper.find(".k-grid-toolbar").off("input.kendoGrid").on("input.kendoGrid", ".k-grid-search input", searchHandler);

        function searchHandler(e) {

          let input = e.currentTarget;
          clearTimeout(grid._searchTimeOut);

          // The reason for the delay is to prevent multiple requests if the user is typing fast.
          timeout = setTimeout(function() {
            grid._searchTimeOut = null;
            var that = grid;
            var options = that.options;
            var searchFields = options.search ? options.search.fields : null;
            // Create a filter expression that will be used for the search and add a custom "search" property to it.
            var expression = { filters:[], logic:"or", search: true };
            var value = input.value;
            // Retrieve the currently applied filters.
            var currentFilters = that.dataSource.filter();
            var combinedFilters = [];

            // Get the columns that can be searched (they are defined in the Grid configuration above).
            if (!searchFields) {
              searchFields = getColumnsFields(options.columns);
            }

            if (that.dataSource.options.endless) {
              that.dataSource.options.endless = null;
              that._endlessPageSize = that.dataSource.options.pageSize;
            }

            // Check if there is a value in the search input.
            if (value) {
              // Create filter expressions by using the value.
              for (var i = 0; i < searchFields.length; i++) {
                that._pushExpression(expression.filters, searchFields[i], value);
              }
            } else {
              // Otherwise empty the expression.
              expression = {};
            }

            // Add the search expression to the combined filter array if there are any filters present in it.
            if(!$.isEmptyObject(expression)) {
              combinedFilters.push(expression);
            }

            // Add the rest of the filters to the filter array.
            if(currentFilters) {
              currentFilters.filters.forEach(function(filter) {
                // Skip the "search" filters as they would already be in the array.
                if(!filter.search) {
                  combinedFilters.push(filter);
                }
              });
            }

            // Filter the dataSource with the search input while keeping the filters that were applied through the columns or by default.
            that.dataSource.filter(combinedFilters);
          }, 300);
        }
      });

      // The following method is used to flatten multi-header columns.
      function leafColumns(columns) {
        var result = [];

        for (var idx = 0; idx < columns.length; idx++) {
          if (!columns[idx].columns) {
            result.push(columns[idx]);
            continue;
          }
          result = result.concat(leafColumns(columns[idx].columns));
        }

        return result;
      }

      // The following method retrieves the names of the fields from the columns.
      function getColumnsFields(columns) {
        var result = [];
        columns = leafColumns(columns);

        for (var idx = 0; idx < columns.length; idx++) {
          if (typeof columns[idx] === "string") {
            result.push(columns[idx]);
          } else if (columns[idx].field) {
            result.push(columns[idx].field);
          }
        }
        return result;
      }
    </script>
```