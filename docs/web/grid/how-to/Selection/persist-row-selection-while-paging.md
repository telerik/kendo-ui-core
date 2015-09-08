---
title: Persist row selection while paging, sorting and filtering
page_title: Persist row selection while paging, sorting and filtering
description: Persist row selection while paging, sorting and filtering
---

# Persist row selection while paging, sorting and filtering

The following runnable sample demonstrates how to persists row selection in a grid, while performing data operations (paging, sorting, filtering).

**The implemented technique requires an ID field to be defined in `schema.model`.**

#### Example

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
            var items = e.sender.items();
            items.each(function (index) {
              var dataItem = e.sender.dataItem(this);
              selectedOrders[dataItem[idField]] = this.className.indexOf("k-state-selected") >= 0;
            });
          },
          dataBound: function (e) {
            var items = e.sender.items();
            var itemsToSelect = [];
            items.each(function (index) {
              var dataItem = e.sender.dataItem(this);
              if (selectedOrders[dataItem[idField]] == true) {
                itemsToSelect.push(this);
              }
            });

            e.sender.select(itemsToSelect);
          }
        });
      });
    </script>
```