---
title: Grid Expand All Collapse All Detail Rows
description: An example on how to expand and collapse all detail rows
type: how-to
page_title: How to Expand And Collapse Detail Rows
slug: grid-how-to-expand-and-collapse-details-rows
tags: grid, expand, collapse, details
ticketid: 1137592
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
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

I have a grid with nested children shown in detail templates.
Is there a built in solution to an expand all/collapse all button the header row?
I want to be able to expand all detail templates and collapse all detail templates with the click of a button.

## Solution
  
Тhe desired result can be achieved using the [expandRow](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-expandRow) and [collapseRow](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-closeCell) methods of the Grid.
  
Please refer to the example demonstrating this:

````html
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
````
  
