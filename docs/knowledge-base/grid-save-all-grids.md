---
title: Save Changes in All Grids 
description: How to Save Grids in All Hierarchy Levels
type: how-to
page_title: How to Save Grids in All Hierarchy Levels | Kendo UI Grid for jQuery
slug: grid-save-all-grids
position: 
tags: 
ticketid: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how to save the changes in all Grids with InCell editing on the page, regardless whether there are separate or configured as an Hierarchy.

## Solution

```dojo
  
    <div id="example">
      <div class='k-button' onclick='SaveAll()'>Save all</div> 
      <br/>      <br/>

      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          var element = $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              batch: true,
              schema: {
                model: {
                  id: "EmployeeID",
                }
              },
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
              },
              pageSize: 6,
              serverPaging: true,
              serverSorting: true
            },
            height: 600,
            saveChanges: masterSaveChanges,
            sortable: true,
            pageable: true,
            editable: true,
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
              batch: true,
              schema: {
                model: {
                  id: "EmployeeID",
                }
              },
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
            saveChanges: detailSaveChanges,
            editable: true,
            pageable: true,
            columns: [
              { field: "OrderID", width: "110px" },
              { field: "ShipCountry", title:"Ship Country", width: "110px" },
              { field: "ShipAddress", title:"Ship Address" },
              { field: "ShipName", title: "Ship Name", width: "300px" }
            ]
          });
        }

        function SaveAll() {
          var grids = $(".k-widget.k-grid");
          for (var i = grids.length - 1; i >= 0; i--) {
            var grid = grids.eq(i).data("kendoGrid");
            if (grid) {
              grid.saveChanges();
            }
          }
        }
        function masterSaveChanges(e) {
          console.log("Master grid changes are saved");
        }
        function detailSaveChanges(e) {
          console.log("Detail grid changes are saved");
        }
      </script>
    </div>

``` 
