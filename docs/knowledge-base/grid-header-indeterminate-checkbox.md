---
title: Make the Header Checkbox Indeterminate
description: "Display indeterminate status for the master checkbox when only some of the Grid checkboxes are selected."
type: how-to
page_title: Make the Header Checkbox Indeterminate - Kendo UI Grid
slug: grid-header-indeterminate-checkbox
position: 
tags: grid, header, checkbox, select, indeterminate, prop, status
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.2.621</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for jQuery</td>
		</tr>
	</tbody>
</table>

## Description

How can I make the master checkbox in the Grid header appear as indeterminate?

## Solution

Utilize the [`change`](/api/javascript/ui/grid/events/change) event of the Grid and find if the checked checkboxes are more than zero but less than all available checkboxes on the page. If so, use the [jQuery.prop()](https://api.jquery.com/prop/) method to change the status of the master checkbox.

The following example demonstrates how to implement indeterminate checkboxes.

```dojo
      <div id="grid"></div>

      <script>
        function onChange(arg) {
          let grid = this,
              selectedRowsCount = grid.select().length,
              pageSize = grid.dataSource.pageSize(),
              headerCheckbox = grid.thead.find(".k-checkbox");

          if(selectedRowsCount > 0 && selectedRowsCount < pageSize){
            headerCheckbox.prop("indeterminate", true);
          } else{
            headerCheckbox.prop("indeterminate", false);
          }
        }

        $(document).ready(function () {
          $("#grid").kendoGrid({
            dataSource: {
              pageSize: 10,
              transport: {
                read:  {
                  url: "https://demos.telerik.com/kendo-ui/service/Products",
                  dataType: "jsonp"
                }
              },
              schema: {
                model: {
                  id: "ProductID"
                }
              }
            },
            pageable: true,
            scrollable: false,
            persistSelection: true,
            sortable: true,
            change: onChange,
            columns: [
              { selectable: true, width: "50px" },
              { field:"ProductName", title: "Product Name" },
              { field: "UnitPrice", title:"Unit Price", format: "{0:c}"},
              { field: "UnitsInStock", title:"Units In Stock"},
              { field: "Discontinued"}]
          });
        });
      </script>
```