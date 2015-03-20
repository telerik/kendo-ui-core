---
title: Refresh grid in detail template
page_title: Refresh grid in detail template
description: Refresh grid in detail template
---

# Refresh grid in detail template

The following runnable sample demonstrates how to refresh a child grid in a detail template using external button

#### Example

```html
    <div id="grid"></div>
    <script>

      var element = $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "http://demos.kendoui.com/service/Northwind.svc/Employees"
          },
          pageSize: 6,
          serverPaging: true,
          serverSorting: true
        },
        height: 450,
        sortable: true,
        pageable: true,
        detailInit: detailInit,
        dataBound: function() {
          this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [
          {
            field: "FirstName",
            title: "First Name"
          },
          {
            field: "LastName",
            title: "Last Name"
          },
          {
            field: "Country"
          },
          {
            field: "City"
          },
          {
            field: "Title"
          }
        ]
      }).on("click", ".btn-refresh", function(e) { 
        var childGrid = $(e.target).closest(".k-grid").data("kendoGrid");
        childGrid.dataSource.read();
      });

      function detailInit(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize:6,
            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
          },
          scrollable: false,
          sortable: true,
          pageable: true,
          toolbar: [{text: "Refresh", className: "btn-refresh"}],
          columns: [
            { field: "OrderID", width: 70 },
            { field: "ShipCountry", title:"Ship Country", width: 100 },
            { field: "ShipAddress", title:"Ship Address" },
            { field: "ShipName", title: "Ship Name", width: 200 }
          ]
        });
      }
    </script>
```