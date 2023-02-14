---
title: Move the Expand Column
description: Learn how to relocate the expand column of a Kendo UI Grid.
type: how-to
page_title: Move the Expand Column - Kendo UI Grid for jQuery
slug: grid-move-expand-column
tags: grid, expand, detail, column, nested, hierarchy, relocate, move
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
  <td>Created with version 2018.1.221</td>
 </tr>
</table>

## Description

How can I relocate the expand column of the Grid?

## Solution

Within the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event, rearrange the columns by using jQuery.

```dojo
  <style>
    /* Set a width for the hierarchy column, otherwise the column you swap it with will be shrunk. */
    .k-grid .k-hierarchy-col {
      width: 110px;
    }
  </style>
  
  <div id="example">
      <div id="grid"></div>

      <script>
        jQuery.fn.swapWith = function(to) {
          return this.each(function() {
            var copy_to = $(to).clone(true);
            var copy_from = $(this).clone(true);
            $(to).replaceWith(copy_from);
            $(this).replaceWith(copy_to);
          });
        };
        
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
              // Swap the hierarchy column with the fourth column of the grid.
              this.thead.find('.k-hierarchy-cell').each(function(_,x){
          	  	x= $(x);
          	  	x.swapWith($("th:eq(3)"));
          		});
              
              this.tbody.find('.k-hierarchy-cell').each(function(_,x){
                x= $(x);
                x.swapWith(x.closest("tr").find('td:eq(3)'));
              });
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
                field: "Title",
                width: "110px"
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
              { field: "ShipAddress", title:"Ship Address", width: "110px" },
              { field: "ShipName", title: "Ship Name", width: "300px" }
            ]
          });
        }
      </script>
    </div>
```
