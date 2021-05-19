---
title: Set Minimum Validation Value on a Grid Date Column
description: How to Set Minimum Validation Value in a Grid Date Column
type: how-to
page_title: How to Set Minimum Validation Value on a Grid Date Column | Kendo UI Grid for jQuery
slug: grid-set-minimum-validation-value-on-a-grid-date-column
position: 
tags: 
ticketid: 1465850
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

This sample demonstrates how to set minimum validation value when editing a Grid column.

## Solution

This can be achieved using the [model configuration](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/schema#schema.model) on the Grid dataSource schema.

```dojo
 <div id="grid"></div>

    <script>

      $("#grid").kendoGrid({  
        dataSource: {
          data: [
            { Date1: new Date()}
          ],
          schema: {
            model: {
              fields: {
                Date1: { type: "date", validation:{min: new Date()} }
              }
            }
          }
        },
        columns: [{
          field: "Date1",
          format: "{0: yyyy-MM-dd}"
        },
                  {
                    command: ["edit", "destroy"],
                    title: "&nbsp;",
                    width: "250px"
                  }],  
        editable: "inline",
      });
    </script>
``` 
