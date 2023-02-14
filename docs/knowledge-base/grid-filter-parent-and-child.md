---
title: Filter both Parent and Child Grids in Hierarchy
description: Learn how to apply filters on both parent and child Grids in Hierarchy.
type: how-to
page_title: Update Adjacent Cells in Rows in Inline Edit Mode - Kendo UI Grid for jQuery
slug: grid-apply-filter-parent-child
tags: grid, filter, parent, child, hierarchy, detail
ticketid: 1573560
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
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

How can I apply filter to both the parent and child Grids in Hierarchy?

## Solution

It is possible to perform filtering over the parent Grid and the child Grid by ensuring the fetching of the filtered data for the parent Grid has finished. This is done by applying the filter to the child Grid in the [`dataBound`](/api/javascript/ui/grid/events/databound) event handler of the parent one.

```dojo
    <button class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md" onclick="filter()">Filter Parent and Child</button>
    <div id="grid"></div>

    <script type="text/x-kendo-template" id="template">
         <div class="orders"></div>
    </script>

    <script>
      $(document).ready(function() {
        var element = $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 20,
            serverPaging: true,
            serverSorting: true
          },
          height: 400,
          filterable: true,
          sortable: true,
          pageable: false,
          detailTemplate: kendo.template($("#template").html()),
          detailInit: detailInit,
          dataBound: function() {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
          },
          columns: [
            {
              field: "FirstName",
              title: "First Name",
              width: "120px"
            },
            {
              field: "LastName",
              title: "Last Name",
              width: "120px"
            },
            {
              field: "Country",
              width: "120px"
            },
            {
              field: "City",
              width: "120px"
            },
            {
              field: "Title"
            }
          ]
        });
      });

      function detailInit(e) {
        var detailRow = e.detailRow;

        detailRow.find(".detailTabstrip").kendoTabStrip({
          animation: {
            open: { effects: "fadeIn" }
          }
        });

        detailRow.find(".orders").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize: 7,
            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
          },
          scrollable: false,
          filterable: true,
          sortable: true,
          pageable: true,
          columns: [
            { field: "OrderID", title:"ID", width: "70px" },
            { field: "ShipCountry", title:"Ship Country", width: "110px" },
            { field: "ShipAddress", title:"Ship Address" },
            { field: "ShipName", title: "Ship Name", width: "300px" }
          ]
        });
      }

      function filter() {
        var mainGrid = $("#grid").data("kendoGrid");
        mainGrid.dataSource.filter({ field: "City", operator: "eq", value: "Seattle" })
        mainGrid.bind("dataBound", function() {
          var detailGrid = $(".orders").data("kendoGrid");
          detailGrid.dataSource.filter({ field: "ShipCountry", operator: "eq", value: "Italy" })
        })
      }
    </script>
```

## See Also

* [API Reference of the Grid](/api/javascript/ui/grid)
* [The dataBound Event of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
