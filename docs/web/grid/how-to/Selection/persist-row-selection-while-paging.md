---
title: Persist row selection while paging
page_title: Persist row selection while paging
description: Persist row selection while paging
---

# Persist row selection while paging

The following runnable sample demonstrates how to persists row selection in a grid, while different pages of the dataSource are shown.

#### Example

```html
    <div id="grid"></div>
    <input type="button" value="previous" onclick="previous();" />
    <script>
      var selected = [];
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
        height: 440,
        selectable: true,
        pageable: true,
        columns: [{
          field:"OrderID",
          filterable: false
        },
                  "Freight",
                  {
                    field: "OrderDate",
                    title: "Order Date",
                    width: 100,
                    format: "{0:MM/dd/yyyy}"
                  }, {
                    field: "ShipName",
                    title: "Ship Name",
                    width: 200
                  }, {
                    field: "ShipCity",
                    title: "Ship City"
                  }],
        change: function (e) {
          var selectedItem = this.dataItem(this.select()),
              currentPage = this.dataSource.page();

          selected[currentPage] = selectedItem.OrderID;
        },
        dataBound: function () {
          var currentPage = this.dataSource.page();
          if(selected[currentPage] !== undefined) {
            var uid = this.dataSource.get(selected[currentPage]).uid;
            this.tbody.find("tr[data-uid='" + uid + "']").addClass("k-state-selected");
          }
        }
      });

      function previous() {
        var grid = $("#grid").data("kendoGrid");
        grid.dataSource.prev();
      }
    </script>
```