---
title: Refresh Grid in Detail Template
page_title: Refresh Grid in Detail Template | Kendo UI Grid for jQuery
description: "An example on how to refresh a child grid in a detail template by using external button."
previous_url: /controls/data-management/grid/how-to/Templates/refresh-grid-in-detail-template
slug: howto_refresh_gridin_detail_template_grid
tags: refresh, child, grid, detail, template, via, external, button
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

How can I refresh a child Kendo UI Grid in a detail template by using an external button?

## Solution

The following example demonstrates how to refresh a child Grid in a detail template by using an external button in the Grid.

```dojo
    <div id="grid"></div>
    <script>

      var element = $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
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
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
