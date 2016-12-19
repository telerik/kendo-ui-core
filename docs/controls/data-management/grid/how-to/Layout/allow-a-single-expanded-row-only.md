---
title: Allow Single Row in Master Grid to be Expanded
page_title: Allow Single Row in Master Grid to be Expanded | Kendo UI Grid
description: "Learn how to allow only one of the rows in a master Kendo UI Grid to be expanded at any time."
slug: howto_allowonlyasingleexpandedrow_grid
---

# Allow Single Row in Master Grid to be Expanded

Sometimes a scenario might require the expanding of a single row in a master Grid at a specific time.

To achieve this behavior:

* Handle the [`detailExpand`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-detailExpand) event.
* Find any previously expanded rows and collapse them by using the [`collapseRow()`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-collapseRow) method.

The example below demonstrates how to collapse a Grid row that was previously expanded (if any) when the user expands a new one.

###### Example

```html
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

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})
* [How to Disable Resizing for Specific Columns]({% slug howto_disable_column_resizing_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
