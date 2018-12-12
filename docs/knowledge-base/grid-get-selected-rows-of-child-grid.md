---
title: Get the Selected Rows of a Child Grid
description: An example on how to get the selected rows of a child Kendo UI Grid.
type: how-to
page_title: Get the Selected Rows of a Child Grid | Kendo UI Gird
slug: grid-get-selected-rows-of-child-grid
tags: grid, select, selected, child, hierarchy, rows, row, get, access
res_type: kb
component: listview
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created version 2018.1.117</td>
 </tr>
</table>

## Description

How can I access the selected rows of a nested grid in my hierarchical Grid?

## Solution

1. Add a unique `Id` to each child Grid.
2. In the [`detailExpand`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailexpand) event handler, save the `Id` of the expanded child Grid.
3. Use the saved `Id` to access the child Grid.

```dojo
    <div id="example">
      <div id="grid"></div>
      <a class='k-button' onclick="printSelected()">Print in console selected items of child grid</a>
      <script>


        var childGrid = "child1";

        function printSelected(){
          console.log($('#'+childGrid).data('kendoGrid').select());
        }


        $(document).ready(function() {
          var element = $("#grid").kendoGrid({
            detailExpand:function(e){
              var grid = this;		

              childGrid=	e.detailRow.find('[data-role="grid"]').attr('id');
              grid.element.find('.k-master-row').each(function(){

                if(this!= e.masterRow[0]){
                  grid.collapseRow(this);
                }							 

              })						

            },
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
            ],

          });
        });

        function detailInit(e) {
          $("<div id='child"+e.data.EmployeeID+"'/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize: 10,
              filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID },
              schema:{
                model:{
                  id:'OrderID'
                }
              }
            },
            persistSelection:true,

            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { selectable: true, width: "50px" },
              { field: "OrderID", width: "110px" },
              { field: "ShipCountry", title:"Ship Country", width: "110px" },
              { field: "ShipAddress", title:"Ship Address" },
              { field: "ShipName", title: "Ship Name", width: "300px" }
            ]
          });
        }
      </script>
    </div>
```
