---
title: Dynamically Select a Row on Any Page in the Grid
description: An example on how to select a row that may be placed on a different page in the Grid.
type: how-to
page_title: Dynamically Select Row in Pageable Grid | Kendo UI Grid
slug: grid-select-row-on-different-page
tags: grid, selection, paging
ticketid: 1408857
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

I want to be able to select a row in the Grid dynamically, regardless of the row position in the Grid data. How can I select a row if it is on a different page of the Grid?

## Solution

1. Find the row index in the Grid DataSource and use it to determine the page containing the row.
1. Navigate the Grid to the page containing the row.
1. Select the row.
1. Scroll the Grid to the position of the row to ensure it is visible.

> This approach works only when the Grid uses client-side operations (paging, sorting, filtering). With server operations, the data from pages different than the current one is not available on the client, so you cannot search for the row index.

The following example demonstrates how to select a row on any page of a client-side paged Grid.

```dojo
    Select row with ID = <input id="numeric" /> (1-78)
    <button id="searchBtn" class="k-button">Go</button>
    <div id="grid"></div>
    <script>
      function selectGridRow(searchedId, grid, idField){
        var dataSource = grid.dataSource;
        var filters = dataSource.filter() || {};
        var sort = dataSource.sort() || {};
        var models = dataSource.data();
        // We are using a Query object to get a sorted and filtered representation of the data, without paging applied, so we can search for the row on all pages
        var query = new kendo.data.Query(models);
        var rowNum = 0;
        var modelToSelect = null;

        models = query.filter(filters).sort(sort).data;

        // Now that we have an accurate representation of data, let's get the item position
        for (var i = 0; i < models.length; ++i) {
          var model = models[i];
          if (model[idField] == searchedId) {
            modelToSelect = model;
            rowNum = i;
            break;
          }
        }

        // If you have persistSelection = true and want to clear all existing selections first, uncomment the next line
        // grid._selectedIds = {};

        // Now go to the page holding the record and select the row
        var currentPageSize = grid.dataSource.pageSize();
        var pageWithRow = parseInt((rowNum / currentPageSize)) + 1; // pages are one-based
        grid.dataSource.page(pageWithRow);

        var row = grid.element.find("tr[data-uid='" + modelToSelect.uid + "']");
        if (row.length > 0) {
          grid.select(row);

          // Scroll to the item to ensure it is visible
          grid.content.scrollTop(grid.select().position().top);
        }
      }

      $(document).ready(function () {

        $("#searchBtn").click(function(){
          var grid = $("#grid").data("kendoGrid");
          var searchedId = $("#numeric").data("kendoNumericTextBox").value();

          selectGridRow(searchedId, grid, "ProductID");
        });

        $("#numeric").kendoNumericTextBox({
          min: 1,
          max: 78,
          format: "n0"
        });

        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            },
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { type: "number" },
                  UnitPrice: { type: "number" },
                  UnitsInStock: { type: "number" }
                }
              }
            },
            pageSize: 10
          },
          height: 350,
          sortable: true,
          filterable: true,
          selectable: "row",
          pageable: {
            refresh: true,
            pageSizes: true
          },
          columns: [
            {
              field: "ProductID",
              title: "ID",
              width: 100
            },{
              field: "ProductName",
              title: "Product Name",
              width: 180
            }, {
              field: "UnitPrice",
              title: "Unit Price"
            }, {
              field: "UnitsInStock",
              title: "Units in Stock"
            }, {
              field: "Discontinued",
              width: 150
            }]
        });
      });
    </script>
```

## See Also

* [kendo.data.Query](/api/javascript/data/query)
* [Grid API reference](/api/javascript/ui/grid)