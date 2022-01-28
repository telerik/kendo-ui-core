---
title: Persist Row Selection during Data Operations
page_title: Persist Row Selection while Paging, Sorting, or Filtering | Kendo UI Grid for jQuery
description: An example on how to persist row selection while performing the paging, sorting, and filtering data operations.
type: how-to
tags: kendo, ui, grid, selection, paging, sorting, grouping, filtering
res_type: kb
component: grid
slug: howto_persist_row_selection_paging_sorting_filtering_grid
previous_url: /controls/data-management/grid/how-to/Selection/persist-row-selection-while-paging
---

> * As of the 2017 R2 release, persisting the selection in the Grid is available out of the box. For more information, refer to the [`persistSelection`](/api/javascript/ui/grid/configuration/persistselection) property.
> * The suggested approach in this article requires you to define an `ID` field in `schema.model`.

(Applicable to Kendo UI 2017.2.504 version and earlier) The following example demonstrates how to persist the row selection in a Grid while performing the paging, sorting, and filtering data operations.

```dojo
    <div id="grid"></div>

    <script>

      $(function () {

        var selectedOrders = [];
        var idField = "OrderID";

        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            schema: {
              model: {
                id: "OrderID",
                fields: {
                  OrderID: { type: "number" },
                  Freight: { type: "number" },
                  ShipName: { type: "string" },
                  OrderDate: { type: "date" },
                  ShipCity: { type: "string" }
                }
              }
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
          },
          height: 400,
          selectable: "multiple",
          pageable: {
            buttonCount: 5
          },
          sortable: true,
          filterable: true,
          navigatable: true,
          columns: [
            {
              field: "ShipCountry",
              title: "Ship Country",
              width: 300
            },
            {
              field: "Freight",
              width: 300
            },
            {
              field: "OrderDate",
              title: "Order Date",
              format: "{0:dd/MM/yyyy}"
            }
          ],
          change: function (e, args) {
            var grid = e.sender;
            var items = grid.items();
            items.each(function (idx, row) {
                var idValue = grid.dataItem(row).get(idField);
                if (row.className.indexOf("k-state-selected") >= 0) {
                    selectedOrders[idValue] = true;
                } else if (selectedOrders[idValue]) {
                    delete selectedOrders[idValue];
                }
            });
          },
          dataBound: function (e) {
            var grid = e.sender;
            var items = grid.items();
            var itemsToSelect = [];
            items.each(function (idx, row) {
              var dataItem = grid.dataItem(row);
              if (selectedOrders[dataItem[idField]]) {
                itemsToSelect.push(row);
              }
            });

            e.sender.select(itemsToSelect);
          }
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
