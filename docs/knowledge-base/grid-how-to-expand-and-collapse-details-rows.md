---
title: Expand and Collapse All Detail Rows in Grid
description: An example on how to expand and collapse all detail rows in a Kendo UI Grid.
type: how-to
page_title: Expand and Collapse All Detail Rows | Kendo UI Grid for jQuery
slug: grid-how-to-expand-and-collapse-details-rows
tags: grid, expand, collapse, details
ticketid: 1137592
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 7 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>61</td>
 </tr> <tr>
  <td>Made with Version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

I have a Grid with nested children which are shown in detail templates.

Does the Grid feature a built-in solution to add an **Expand All** and **Collapse All** button in the header row? How can I expand and collapse all detail templates with the click of a button?

## Solution

Use the [`expandRow`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/expandrow) and [`collapseRow`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/closecell) methods of the Grid.

```dojo
<div id="example">
      <button class="k-button" id="expand">Expand All</button>
      <button class="k-button" id="collapse">Collapse All</button>
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

        $('#expand').click(function(e){
          var grid = $("#grid").data("kendoGrid");
          $( ".k-master-row" ).each(function( index ) {
            grid.expandRow(this);
          });
        })

        $('#collapse').click(function(e){
          var grid = $("#grid").data("kendoGrid");
          $( ".k-master-row" ).each(function( index ) {
            grid.collapseRow(this);
          });
        })
      </script>
    </div>
```
