---
title: Show Tooltip for Grid Custom Command Buttons
description: Display a tooltip when hovering custom command buttons in the Grid | Kendo UI Grid
type: how-to
page_title: Display a Tooltip for Custom Command Buttons
slug: grid-show-tooltip-custom-command
tags: grid, command, tooltip
ticketid: 1148238
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
	<tr>
		<td>Product Version</td>
		<td>2017.3.1026</td>
	</tr>
</table>


## Description
I want to know how to show a tooltip for Kendo UI Grid custom command buttons.

## Solution
There is no property for setting a tooltip to command buttons but you can easily add one with custom code. 

1. Set a `name` to the custom command button. This will produce a `k-grid-commandName` class in the button HTML output:
	
	```
	    <a role="button" class="k-button k-button-icontext k-grid-custom" href="#">Do Stuff</a>
	```
1. Create a Kendo UI Tooltip, which `filter` property is set to include the `k-grid-commandName` class. 

```html
      <div id="grid"></div>
      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    Freight: { type: "number" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShipCity: { type: "string" }
                  }
                }
              },
              pageSize: 20,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            },
            height: 550,
            filterable: true,
            sortable: true,
            pageable: true,
            columns: [
              {
                field:"OrderID",
                filterable: false
              },
              "Freight",
              {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:MM/dd/yyyy}"
              }, {
                field: "ShipName",
                title: "Ship Name"
              }, {
                field: "ShipCity",
                title: "Ship City"
              },
              {
                command: {
                  name: "custom",
                  text: "Do Stuff"
                }
              }
            ]
          });
          $("#grid").kendoTooltip({
            filter: ".k-grid-custom",
            content: function(e){
              return "Click here";
            }
          });
        });
      </script>
```

## See Also

* [Kendo UI Tooltip Demos](https://demos.telerik.com/kendo-ui/tooltip/index)
* [Kendo UI Tooltip Documentation](/controls/layout/tooltip/overview)
