---
title: Add nested child grids
description: "Learn how to add nested child grids."
type: how-to
page_title: Add nested Child Grids - Kendo UI Grid for jQuery
slug: grid-add-nested-child-grids
tags: grid, hierarchy, nested, child
ticketid: 1528111
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the 2021.2.616 version</td>
 </tr>
</table>

## Description

How can I add hierarchy of nested child grids in Kendo UI?

## Solution

Handle the [`detailInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailinit) event of each parent Grid and initialize the next level of the Hierarchy in it.

```dojo

<div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
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
            height: 600,
            sortable: true,
            pageable: true,
            detailInit: detailInit,
            dataBound: function() {
              this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
            columns: [
              {
                field: "FirstName",
                title: "First Name",
                width: "110px"
              },
              {
                field: "LastName",
                title: "Last Name",
                width: "110px"
              },
              {
                field: "Country",
                width: "110px"
              },
              {
                field: "City",
                width: "110px"
              },
              {
                field: "Title"
              }
            ]
          });
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
              pageSize: 10,
              filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
            },
            detailInit: detailInitCustomers,
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "OrderID", width: "110px" },
              { field: "ShipCountry", title:"Ship Country", width: "110px" },
              { field: "ShipAddress", title:"Ship Address" },
              { field: "ShipName", title: "Ship Name", width: "300px" }
            ]
          });
        }

        function detailInitCustomers(e) {
          $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize: 10,
              filter: { field: "CustomerID", operator: "eq", value: e.data.CustomerID }
            },
            detailInit: detailInitOrdersByCustomers,
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "ContactName", title:"Name" },
              { field: "CompanyName", title:"Company" }
            ]
          });
        }

        function detailInitOrdersByCustomers(e) {
          $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
              type: "odata",
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShippedDate: { type: "date" }
                  }
                }
              },
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize: 10,
              filter: { field: "CustomerID", operator: "eq", value: e.data.CustomerID }
            },
            detailInit: detailInitShippers,
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "OrderID", width: "110px" },
              { field: "OrderDate", title:"Order Date" },
              { field: "ShippedDate", title:"Shipped Date" },
              { field: "ShipName", title: "Ship Name" }
            ]
          });
        }

        function detailInitShippers (e) {
          $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Shippers"
              },
              serverFiltering: true,
              filter: { field: "ShipperID", operator: "eq", value: e.data.ShipVia }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "ShipperID", width: "110px" },
              { field: "CompanyName", title:"Company" }
            ]
          });
        }
      </script>
    </div>
```
