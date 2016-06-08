---
title: Persist Row Selection during Data Operations
page_title: Persist Row Selection during Data Operations | Kendo UI Grid
description: "Learn how to persist row selection while performing the paging, sorting, and filtering data operations in the Kendo UI Grid."
slug: howto_persist_row_selection_paging_sorting_filtering_grid
---

# Persist Row Selection during Data Operations

The example below demonstrates how to persist the row selection in a Kendo UI Grid, while performing the data operations of paging, sorting, and filtering.

> **Importnat**
>  
> The implemented technique requires you to define an `ID` field in `schema.model`.

###### Example

```html
    <div id="grid"></div>

    <script>

      $(function () {

        var selectedOrders = [];
        var idField = "OrderID";

        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
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

Other articles on the Kendo UI Grid and how-to examples on the selection functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Make Selection with Checkbox Column]({% slug howto_make_selection_checkbox_column_grid %})
* [How to Prevent Selection for Checkbox Cells]({% slug howto_prevent_selection_checkbox_cells_grid %})
* [How to Select Multiple Rows with Checkboxes]({% slug howto_select_multiple_rowswith_checkboxes_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
