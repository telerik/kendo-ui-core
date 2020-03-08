---
title: Disable Hover Row Style
description: An example which shows how to prevent the row from changing colors upon hovering.
type: how-to
page_title: Prevent Hover Color Change for Rows | Kendo UI Grid
slug: grid-disable-hover-row-style
position: 
tags: grid, row, hover, disable, prevent, style
ticketid: 1436153
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.1023</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I disable the hover styles for the row and alt rows for my Kendo UI Grid?

## Solution

 To configure the Kendo UI Grid rows to not have a different style upon hovering, set the background color.  The `.k-alt background-color` will need to be changed specifically based on the used theme.  In this instance, it is using Bootstrap:

 ```css
    html .k-grid tr:hover {
      background: transparent;
    }
 
    html .k-grid tr.k-alt:hover {
      background: rgba(33,37,41,.03);
    }
 ```
 
### Example

 ```dojo
     <style>
      html .k-grid tr:hover {
        background: transparent;
      }

      html .k-grid tr.k-alt:hover {
        /*Silver Theme*/
        background: #fbfbfb;
      }
    </style>

    <div id="example">
      <div id="grid"></div>
      <script>
        $(document).ready(function () {
          $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
              },
              pageSize: 20
            },
            height: 550,
            groupable: true,
            sortable: true,
            pageable: {
              refresh: true,
              pageSizes: true,
              buttonCount: 5
            },
            columns: [{
              template: "<div class='customer-name'>#: ContactName #</div>",
              field: "ContactName",
              title: "Contact Name",
              width: 240
            }, {
              field: "ContactTitle",
              title: "Contact Title"
            }, {
              field: "CompanyName",
              title: "Company Name"
            }, {
              field: "Country",
              width: 150
            }]
          });
        });
      </script>
    </div>
 ```
