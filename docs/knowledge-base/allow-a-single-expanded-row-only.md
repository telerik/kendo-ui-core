---
title: Allow Single Row in Master Grid to be Expanded
page_title: Allow Single Row Expansion in Master Grids | Kendo UI Grid for jQuery
description: "An example on how to collapse a row that was previously expanded when the user expands a new one in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Layout/allow-a-single-expanded-row-only
slug: howto_allowonlyasingleexpandedrow_grid
tags: grid, single, row, master, expand
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I expand a single row in a master Kendo UI Grid at a specific time?

## Solution

1. Handle the [`detailExpand`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailexpand) event.
1. Find any previously expanded rows and collapse them by using the [`collapseRow()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/collapserow) method.

The following example demonstrates how to collapse a Grid row that was previously expanded when the user expands a new one.

```dojo
	<div id="grid"></div>
	<script>
	  $(document).ready(function() {
	    var grid = $("#grid").kendoGrid({
	      dataSource: {
	        type: "odata",
	        transport: {
	          read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
	        },
	        pageSize: 6,
	        serverPaging: true,
	        serverSorting: true
	      },
	      scrollable: false,
	      sortable: true,
	      pageable: true,
	      detailInit: detailInit,
	      detailExpand: function(e){
	        e.sender.tbody.find('.k-detail-row').each(function(idx, item){
	          if(item !== e.detailRow[0]){
	            e.sender.collapseRow($(item).prev());
	          }
	        })
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
	    }).data('kendoGrid');
	  });

	  function detailInit(e) {
	    $("<div/>").appendTo(e.detailCell).kendoGrid({
	      dataSource: {
	        type: "odata",
	        transport: {
	          read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
	        },
	        serverPaging: true,
	        serverSorting: true,
	        serverFiltering: true,
	        pageSize: 3,
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
	</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
