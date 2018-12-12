---
title: Show Tooltip for Grid Custom Command Buttons
description: An example on how to display a tooltip when hovering custom command buttons in the Kendo UI Grid.
type: how-to
page_title: Display a Tooltip for Custom Command Buttons | Kendo UI Grid
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
		<td>Progress Kendo UI Tooltip</td>
	</tr>
	<tr>
		<td>Product Version</td>
		<td>2017.3.1026</td>
	</tr>
</table>


## Description

How can I show a tooltip for the Grid custom command buttons?

## Solution

The Grid does not support a property for setting a tooltip to its command buttons. However, you can work around this issue by using a custom approach.

1. Set a `name` to the custom command button to produce a `k-grid-commandName` class in the button HTML output.

	```
	    <a role="button" class="k-button k-button-icontext k-grid-custom" href="#">Do Stuff</a>
	```
1. Create a Kendo UI Tooltip whose `filter` property is set to include the `k-grid-commandName` class.

```dojo
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
